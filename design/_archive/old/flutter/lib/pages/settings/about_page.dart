import 'package:flutter/material.dart';
import '../../design/app_colors.dart';
import '../../design/app_spacing.dart';
import '../../l10n/app_localizations.dart';

/// About + licenses + changelog. A single screen with three tabs so the
/// "About" entry in Settings doesn't fan out into three separate routes.
class AboutPage extends StatefulWidget {
  const AboutPage({super.key});
  @override
  State<AboutPage> createState() => _AboutPageState();
}

class _AboutPageState extends State<AboutPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tab = TabController(length: 3, vsync: this);

  @override
  void dispose() { _tab.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(l.about),
        bottom: TabBar(
          controller: _tab,
          tabs: const [
            Tab(text: 'About'),
            Tab(text: 'Licenses'),
            Tab(text: 'Changelog'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tab,
        children: const [
          _AboutTab(),
          _LicensesTab(),
          _ChangelogTab(),
        ],
      ),
    );
  }
}

class _AboutTab extends StatelessWidget {
  const _AboutTab();
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.pageGutter),
      children: [
        const SizedBox(height: AppSpacing.lg),
        Center(
          child: Container(
            width: 88, height: 88,
            decoration: const BoxDecoration(
              shape: BoxShape.circle, gradient: AppColors.brandGradient),
            child: const Icon(Icons.shield_rounded,
                color: Colors.white, size: 48),
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        Center(
            child: Text('VPNclient',
                style: theme.textTheme.headlineSmall)),
        const SizedBox(height: 4),
        Center(
            child: Text('Version 1.0.0 (build 1024)',
                style: theme.textTheme.bodySmall
                    ?.copyWith(color: AppColors.textMuted))),
        const SizedBox(height: AppSpacing.xl),
        _LinkRow(
            icon: Icons.public_rounded,
            label: 'Website',
            value: 'vpnclient.app'),
        _LinkRow(
            icon: Icons.send_rounded,
            label: 'Telegram',
            value: '@vpnclient_support'),
        _LinkRow(
            icon: Icons.code_rounded,
            label: 'Source code',
            value: 'github.com/VPNclient'),
        _LinkRow(
            icon: Icons.privacy_tip_outlined,
            label: 'Privacy policy',
            value: ''),
        _LinkRow(
            icon: Icons.gavel_rounded,
            label: 'Terms of service',
            value: ''),
        const SizedBox(height: AppSpacing.xxl),
      ],
    );
  }
}

class _LinkRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  const _LinkRow(
      {required this.icon, required this.label, required this.value});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      margin: const EdgeInsets.only(bottom: 6),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
      ),
      child: ListTile(
        leading: Container(
          width: 32, height: 32,
          decoration: BoxDecoration(
            color: theme.colorScheme.primary.withValues(alpha: 0.1),
            borderRadius: BorderRadius.circular(AppSpacing.radiusSm),
          ),
          child: Icon(icon, color: theme.colorScheme.primary, size: 18),
        ),
        title: Text(label),
        subtitle: value.isEmpty ? null : Text(value),
        trailing: const Icon(Icons.open_in_new_rounded,
            size: 18, color: AppColors.textMuted),
      ),
    );
  }
}

class _LicensesTab extends StatelessWidget {
  const _LicensesTab();
  static const _items = <(String, String)>[
    ('Flutter', 'BSD 3-Clause'),
    ('xray-core', 'MPL-2.0'),
    ('sing-box', 'GPL-3.0'),
    ('provider', 'MIT'),
    ('shared_preferences', 'BSD-3-Clause'),
    ('mobile_scanner', 'MIT'),
    ('material_symbols_icons', 'OFL-1.1'),
  ];
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView.separated(
      padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.pageGutter, vertical: AppSpacing.md),
      itemCount: _items.length,
      separatorBuilder: (_, __) => const SizedBox(height: 6),
      itemBuilder: (ctx, i) {
        final (name, license) = _items[i];
        return Container(
          decoration: BoxDecoration(
            color: theme.colorScheme.surface,
            borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
          ),
          child: ListTile(
            title: Text(name),
            subtitle: Text(license),
            trailing: const Icon(Icons.chevron_right,
                color: AppColors.textMuted),
            onTap: () {/* show full license text */},
          ),
        );
      },
    );
  }
}

class _ChangelogTab extends StatelessWidget {
  const _ChangelogTab();
  static const _entries = <(String, String, List<String>)>[
    ('1.0.0', '2026-04-22', [
      'Brand refresh — new blue palette and connect button',
      'Subscription import (URL / QR / file) — Hiddify-compatible',
      'Split tunneling: Bypass / Only modes',
      'RU + EN + ZH + TH localization',
    ]),
    ('0.9.4', '2026-03-10', [
      'Reality protocol support',
      'Per-server ping test',
      'Auto-select fastest server',
    ]),
    ('0.9.0', '2026-02-01', [
      'Public beta',
    ]),
  ];
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return ListView.separated(
      padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.pageGutter, vertical: AppSpacing.md),
      itemCount: _entries.length,
      separatorBuilder: (_, __) => const SizedBox(height: AppSpacing.sm),
      itemBuilder: (ctx, i) {
        final (version, date, items) = _entries[i];
        return Container(
          padding: const EdgeInsets.all(AppSpacing.md),
          decoration: BoxDecoration(
            color: theme.colorScheme.surface,
            borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.sm, vertical: 2),
                  decoration: BoxDecoration(
                    gradient: AppColors.brandGradient,
                    borderRadius:
                        BorderRadius.circular(AppSpacing.radiusPill),
                  ),
                  child: Text('v$version',
                      style: const TextStyle(
                          color: Colors.white, fontSize: 12)),
                ),
                const SizedBox(width: AppSpacing.sm),
                Text(date,
                    style: theme.textTheme.bodySmall
                        ?.copyWith(color: AppColors.textMuted)),
              ]),
              const SizedBox(height: AppSpacing.sm),
              for (final it in items)
                Padding(
                  padding: const EdgeInsets.only(bottom: 4),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Padding(
                        padding: EdgeInsets.only(top: 6, right: 8),
                        child: Icon(Icons.circle,
                            size: 5, color: AppColors.textMuted),
                      ),
                      Expanded(child: Text(it)),
                    ],
                  ),
                ),
            ],
          ),
        );
      },
    );
  }
}
