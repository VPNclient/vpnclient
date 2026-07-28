import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../design/app_colors.dart';
import '../../design/app_spacing.dart';
import '../../l10n/app_localizations.dart';
import '../../models/server.dart';
import '../../providers/subscription_provider.dart';

/// Subscription detail / management — header (name, expiry, traffic), action
/// row (refresh / copy URL / share QR), settings (auto-update, name, URL),
/// and the list of servers belonging to this subscription with manual reorder.
class SubscriptionDetailPage extends StatefulWidget {
  final Subscription subscription;
  const SubscriptionDetailPage({super.key, required this.subscription});

  @override
  State<SubscriptionDetailPage> createState() => _SubscriptionDetailPageState();
}

class _SubscriptionDetailPageState extends State<SubscriptionDetailPage> {
  bool _refreshing = false;
  late bool _autoUpdate = widget.subscription.autoUpdate;

  Future<void> _refresh() async {
    setState(() => _refreshing = true);
    await Future.delayed(const Duration(seconds: 1));
    if (mounted) setState(() => _refreshing = false);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final sub = widget.subscription;

    return Scaffold(
      appBar: AppBar(title: Text(sub.name)),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.pageGutter),
        children: [
          _Header(sub: sub, refreshing: _refreshing),
          const SizedBox(height: AppSpacing.md),
          Row(children: [
            Expanded(
              child: _ActionTile(
                icon: Icons.refresh_rounded,
                label: 'Update',
                onTap: _refreshing ? null : _refresh,
              ),
            ),
            const SizedBox(width: AppSpacing.xs),
            Expanded(
              child: _ActionTile(
                icon: Icons.link_rounded,
                label: 'Copy URL',
                onTap: () {/* Clipboard.setData(ClipboardData(text: sub.url)) */},
              ),
            ),
            const SizedBox(width: AppSpacing.xs),
            Expanded(
              child: _ActionTile(
                icon: Icons.qr_code_rounded,
                label: 'Share QR',
                onTap: () {/* show QR sheet */},
              ),
            ),
          ]),
          const SizedBox(height: AppSpacing.lg),
          _SectionLabel('Settings'),
          Container(
            decoration: BoxDecoration(
              color: theme.colorScheme.surface,
              borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
            ),
            child: Column(children: [
              SwitchListTile(
                value: _autoUpdate,
                onChanged: (v) => setState(() => _autoUpdate = v),
                title: const Text('Auto-update'),
                subtitle: const Text('Refresh server list every 24 h'),
                contentPadding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md),
              ),
              Divider(height: 1, color: theme.dividerColor),
              ListTile(
                title: const Text('Source URL'),
                subtitle: Text(sub.url, maxLines: 1, overflow: TextOverflow.ellipsis),
                trailing: const Icon(Icons.chevron_right,
                    color: AppColors.textMuted),
              ),
              Divider(height: 1, color: theme.dividerColor),
              ListTile(
                title: const Text('Last updated'),
                trailing: Text('2 hours ago',
                    style: theme.textTheme.bodyMedium
                        ?.copyWith(color: AppColors.textMuted)),
              ),
            ]),
          ),
          const SizedBox(height: AppSpacing.md),
          _SectionLabel('${sub.servers.length} servers'),
          for (final s in sub.servers)
            Container(
              margin: const EdgeInsets.only(bottom: 6),
              decoration: BoxDecoration(
                color: theme.colorScheme.surface,
                borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
              ),
              child: ListTile(
                contentPadding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.md),
                leading: CircleAvatar(
                  backgroundColor: const Color(0xFFECEFF1),
                  child: Text(s.flagCode,
                      style: const TextStyle(
                          fontWeight: FontWeight.w600, fontSize: 12)),
                ),
                title: Text(s.displayName),
                trailing: Text('${s.pingMs} ms',
                    style: TextStyle(color: AppColors.pingColor(s.pingMs))),
              ),
            ),
          const SizedBox(height: AppSpacing.lg),
          OutlinedButton.icon(
            icon: const Icon(Icons.delete_outline_rounded),
            label: const Text('Delete subscription'),
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.danger,
              side: BorderSide(color: AppColors.divider),
            ),
            onPressed: () => _confirmDelete(context),
          ),
          const SizedBox(height: AppSpacing.xxl),
        ],
      ),
    );
  }

  Future<void> _confirmDelete(BuildContext context) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Delete subscription?'),
        content: Text(
            '${widget.subscription.servers.length} servers will be removed.'),
        actions: [
          TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Cancel')),
          TextButton(
              style: TextButton.styleFrom(foregroundColor: AppColors.danger),
              onPressed: () => Navigator.of(context).pop(true),
              child: const Text('Delete')),
        ],
      ),
    );
    if (ok == true && mounted) Navigator.of(context).pop();
  }
}

class _Header extends StatelessWidget {
  final Subscription sub;
  final bool refreshing;
  const _Header({required this.sub, required this.refreshing});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: AppColors.brandGradient,
        borderRadius: BorderRadius.circular(AppSpacing.radiusLg),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            const Icon(Icons.cloud_outlined, color: Colors.white),
            const SizedBox(width: 6),
            Expanded(
                child: Text(sub.name,
                    style: theme.textTheme.titleLarge
                        ?.copyWith(color: Colors.white))),
            if (refreshing)
              const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(
                      strokeWidth: 2,
                      valueColor: AlwaysStoppedAnimation(Colors.white))),
          ]),
          const SizedBox(height: AppSpacing.md),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _Tile(label: 'Servers', value: '${sub.servers.length}'),
              _Tile(label: 'Expires', value: sub.expiry),
              _Tile(label: 'Used', value: '12.4 GB'),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          ClipRRect(
            borderRadius: BorderRadius.circular(2),
            child: const LinearProgressIndicator(
              value: 0.34,
              backgroundColor: Color(0x40FFFFFF),
              valueColor: AlwaysStoppedAnimation(Colors.white),
              minHeight: 4,
            ),
          ),
        ],
      ),
    );
  }
}

class _Tile extends StatelessWidget {
  final String label;
  final String value;
  const _Tile({required this.label, required this.value});
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(value,
            style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w600)),
        const SizedBox(height: 2),
        Text(label,
            style: TextStyle(
                color: Colors.white.withValues(alpha: 0.85), fontSize: 12)),
      ],
    );
  }
}

class _ActionTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback? onTap;
  const _ActionTile({required this.icon, required this.label, this.onTap});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Material(
      color: theme.colorScheme.surface,
      borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
      child: InkWell(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
          child: Column(children: [
            Icon(icon, color: theme.colorScheme.primary),
            const SizedBox(height: 4),
            Text(label, style: theme.textTheme.bodySmall),
          ]),
        ),
      ),
    );
  }
}

class _SectionLabel extends StatelessWidget {
  final String text;
  const _SectionLabel(this.text);
  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(AppSpacing.md, 0, 0, AppSpacing.xs),
        child: Text(text.toUpperCase(),
            style: Theme.of(context)
                .textTheme
                .bodySmall
                ?.copyWith(color: AppColors.textMuted, letterSpacing: 0.5)),
      );
}
