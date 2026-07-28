import 'package:flutter/material.dart';
import '../design/app_colors.dart';
import '../design/app_spacing.dart';

/// Reusable error / empty-state surface. Three pre-baked kinds match the
/// connection failure modes the user can hit:
///   • [ErrorView.noInternet]      — physical link is down
///   • [ErrorView.permissionDenied] — VPN permission rejected by OS
///   • [ErrorView.connectionFailed] — handshake / auth error from the proxy
///
/// Use as a full screen, or drop into the body of a [Scaffold] above the bottom
/// nav. Primary action is always present; secondary action optional.
class ErrorView extends StatelessWidget {
  final IconData icon;
  final Color tone;
  final String title;
  final String body;
  final String primaryLabel;
  final VoidCallback onPrimary;
  final String? secondaryLabel;
  final VoidCallback? onSecondary;

  const ErrorView({
    super.key,
    required this.icon,
    required this.tone,
    required this.title,
    required this.body,
    required this.primaryLabel,
    required this.onPrimary,
    this.secondaryLabel,
    this.onSecondary,
  });

  factory ErrorView.noInternet({required VoidCallback onRetry}) => ErrorView(
        icon: Icons.wifi_off_rounded,
        tone: AppColors.warning,
        title: 'No internet connection',
        body:
            'Check Wi-Fi or cellular data and try again. VPNclient cannot reach the server until the device is online.',
        primaryLabel: 'Retry',
        onPrimary: onRetry,
        secondaryLabel: 'Open network settings',
        onSecondary: () {/* AppSettings.openSettings() */},
      );

  factory ErrorView.permissionDenied({
    required VoidCallback onRequestAgain,
  }) =>
      ErrorView(
        icon: Icons.lock_rounded,
        tone: AppColors.danger,
        title: 'VPN permission denied',
        body:
            'VPNclient needs permission to add a VPN configuration. Without it the tunnel cannot be established.',
        primaryLabel: 'Grant permission',
        onPrimary: onRequestAgain,
        secondaryLabel: 'Why is this needed?',
        onSecondary: () {/* navigate to FAQ */},
      );

  factory ErrorView.connectionFailed({
    required String serverName,
    required VoidCallback onRetry,
    required VoidCallback onChangeServer,
  }) =>
      ErrorView(
        icon: Icons.error_outline_rounded,
        tone: AppColors.danger,
        title: 'Connection failed',
        body:
            'Could not establish a tunnel to $serverName. The server may be offline, or your subscription has expired.',
        primaryLabel: 'Retry',
        onPrimary: onRetry,
        secondaryLabel: 'Choose another server',
        onSecondary: onChangeServer,
      );

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.pageGutter),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 96, height: 96,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: tone.withValues(alpha: 0.12),
            ),
            child: Icon(icon, color: tone, size: 44),
          ),
          const SizedBox(height: AppSpacing.lg),
          Text(title,
              textAlign: TextAlign.center,
              style: theme.textTheme.headlineSmall),
          const SizedBox(height: AppSpacing.sm),
          Text(body,
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyMedium
                  ?.copyWith(color: AppColors.textMuted, height: 1.5)),
          const SizedBox(height: AppSpacing.xl),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: FilledButton(
              onPressed: onPrimary,
              child: Text(primaryLabel),
            ),
          ),
          if (secondaryLabel != null) ...[
            const SizedBox(height: AppSpacing.xs),
            TextButton(
              onPressed: onSecondary,
              child: Text(secondaryLabel!),
            ),
          ],
        ],
      ),
    );
  }
}

/// Inline banner variant for the Main screen — shows above the connect button
/// when a non-blocking issue is detected (e.g. metered network, expired sub).
class ErrorBanner extends StatelessWidget {
  final IconData icon;
  final String text;
  final VoidCallback? onAction;
  final String? actionLabel;
  final Color tone;

  const ErrorBanner({
    super.key,
    required this.icon,
    required this.text,
    this.onAction,
    this.actionLabel,
    this.tone = AppColors.warning,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md, vertical: AppSpacing.sm),
      decoration: BoxDecoration(
        color: tone.withValues(alpha: 0.12),
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
      ),
      child: Row(children: [
        Icon(icon, color: tone, size: 20),
        const SizedBox(width: AppSpacing.sm),
        Expanded(child: Text(text)),
        if (onAction != null && actionLabel != null)
          TextButton(
            style: TextButton.styleFrom(foregroundColor: tone),
            onPressed: onAction,
            child: Text(actionLabel!),
          ),
      ]),
    );
  }
}
