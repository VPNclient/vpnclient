import 'package:flutter/material.dart';
import '../../design/app_colors.dart';
import '../../design/app_spacing.dart';
import '../../l10n/app_localizations.dart';

/// Three-step onboarding: welcome → quick feature tour → request VPN
/// permission. The last step calls [onPermissionRequest] which the host wires
/// to the platform-specific VPN-permission dialog (NEVPNManager on iOS,
/// VpnService.prepare on Android).
class OnboardingPage extends StatefulWidget {
  final VoidCallback onComplete;
  final Future<bool> Function() onPermissionRequest;
  const OnboardingPage({
    super.key,
    required this.onComplete,
    required this.onPermissionRequest,
  });
  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage> {
  final _ctrl = PageController();
  int _page = 0;
  bool _granting = false;

  Future<void> _next() async {
    if (_page < 2) {
      _ctrl.nextPage(
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut);
      return;
    }
    setState(() => _granting = true);
    final ok = await widget.onPermissionRequest();
    if (!mounted) return;
    setState(() => _granting = false);
    if (ok) {
      widget.onComplete();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content:
              Text('VPN permission was denied. Tap "Grant" again to retry.'),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: widget.onComplete,
                child: const Text('Skip'),
              ),
            ),
            Expanded(
              child: PageView(
                controller: _ctrl,
                onPageChanged: (i) => setState(() => _page = i),
                children: const [
                  _Step(
                    illustration: _OnbIllustration(
                      icon: Icons.shield_rounded,
                      gradient: AppColors.brandGradient,
                    ),
                    title: 'Welcome to VPNclient',
                    body:
                        'Open, fast, and built for the protocols that actually keep you online — VLESS, Reality, Shadowsocks, WireGuard.',
                  ),
                  _Step(
                    illustration: _OnbIllustration(
                      icon: Icons.cloud_sync_rounded,
                      gradient: AppColors.brandGradient,
                    ),
                    title: 'Bring your own servers',
                    body:
                        'Paste a Hiddify / v2rayNG subscription link or scan a QR. Servers stay in sync, ranked by ping.',
                  ),
                  _Step(
                    illustration: _OnbIllustration(
                      icon: Icons.lock_rounded,
                      gradient: AppColors.brandGradient,
                    ),
                    title: 'Allow VPN connection',
                    body:
                        'On the next screen your system will ask permission to add a VPN configuration. Tap "Allow" to enable secure routing.',
                  ),
                ],
              ),
            ),
            _Dots(count: 3, current: _page),
            const SizedBox(height: AppSpacing.lg),
            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: AppSpacing.pageGutter),
              child: SizedBox(
                width: double.infinity,
                height: 56,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: AppColors.brandGradient,
                    borderRadius:
                        BorderRadius.circular(AppSpacing.radiusMd),
                    boxShadow: [
                      BoxShadow(
                        color:
                            AppColors.brandBlue.withValues(alpha: 0.3),
                        blurRadius: 16,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: Material(
                    color: Colors.transparent,
                    child: InkWell(
                      borderRadius:
                          BorderRadius.circular(AppSpacing.radiusMd),
                      onTap: _granting ? null : _next,
                      child: Center(
                        child: _granting
                            ? const SizedBox(
                                width: 22,
                                height: 22,
                                child: CircularProgressIndicator(
                                    valueColor:
                                        AlwaysStoppedAnimation(Colors.white),
                                    strokeWidth: 2),
                              )
                            : Text(
                                _page < 2 ? 'Continue' : 'Grant permission',
                                style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                    fontWeight: FontWeight.w500),
                              ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.lg),
          ],
        ),
      ),
    );
  }
}

class _Step extends StatelessWidget {
  final Widget illustration;
  final String title;
  final String body;
  const _Step(
      {required this.illustration, required this.title, required this.body});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.pageGutter),
      child: Column(
        children: [
          const Spacer(),
          illustration,
          const SizedBox(height: AppSpacing.xxl),
          Text(title,
              textAlign: TextAlign.center,
              style: theme.textTheme.headlineSmall),
          const SizedBox(height: AppSpacing.sm),
          Text(body,
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium
                  ?.copyWith(color: AppColors.textMuted, height: 1.5)),
          const Spacer(flex: 2),
        ],
      ),
    );
  }
}

class _OnbIllustration extends StatelessWidget {
  final IconData icon;
  final LinearGradient gradient;
  const _OnbIllustration({required this.icon, required this.gradient});
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 160, height: 160,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: gradient,
        boxShadow: [
          BoxShadow(
            color: AppColors.brandBlue.withValues(alpha: 0.3),
            blurRadius: 32,
            offset: const Offset(0, 16),
          ),
        ],
      ),
      child: Icon(icon, color: Colors.white, size: 80),
    );
  }
}

class _Dots extends StatelessWidget {
  final int count;
  final int current;
  const _Dots({required this.count, required this.current});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        for (var i = 0; i < count; i++)
          AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            margin: const EdgeInsets.symmetric(horizontal: 4),
            width: i == current ? 24 : 8,
            height: 8,
            decoration: BoxDecoration(
              color: i == current
                  ? theme.colorScheme.primary
                  : AppColors.textMuted.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(4),
            ),
          ),
      ],
    );
  }
}
