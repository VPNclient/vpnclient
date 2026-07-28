import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../design/app_colors.dart';
import '../../design/app_spacing.dart';
import '../../l10n/app_localizations.dart';
import '../../models/server.dart';
import '../../providers/subscription_provider.dart';

/// Server detail / edit. Read-only header card (latency, last test, location)
/// + an editable form for manually-added servers (host / port / protocol /
/// security / SNI). Subscription-imported servers have the form locked, with
/// a hint pointing to the subscription source.
class ServerDetailPage extends StatefulWidget {
  final Server server;
  final bool editable;
  const ServerDetailPage({
    super.key,
    required this.server,
    this.editable = false,
  });

  @override
  State<ServerDetailPage> createState() => _ServerDetailPageState();
}

class _ServerDetailPageState extends State<ServerDetailPage> {
  late final TextEditingController _name;
  late final TextEditingController _host;
  late final TextEditingController _port;
  late final TextEditingController _sni;
  String _protocol = 'VLESS';
  String _security = 'Reality';
  bool _testing = false;
  int? _testedPing;

  @override
  void initState() {
    super.initState();
    _name = TextEditingController(text: widget.server.displayName);
    _host = TextEditingController(text: 'server.example.com');
    _port = TextEditingController(text: '443');
    _sni = TextEditingController(text: 'yandex.ru');
  }

  @override
  void dispose() {
    _name.dispose();
    _host.dispose();
    _port.dispose();
    _sni.dispose();
    super.dispose();
  }

  Future<void> _runPingTest() async {
    setState(() => _testing = true);
    await Future.delayed(const Duration(milliseconds: 800));
    if (!mounted) return;
    setState(() {
      _testing = false;
      _testedPing = widget.server.pingMs - 4;
    });
  }

  @override
  Widget build(BuildContext context) {
    final l = AppLocalizations.of(context)!;
    final theme = Theme.of(context);
    final s = widget.server;
    final ping = _testedPing ?? s.pingMs;

    return Scaffold(
      appBar: AppBar(
        title: Text(s.displayName),
        actions: [
          if (widget.editable)
            IconButton(
              icon: const Icon(Icons.delete_outline_rounded),
              color: AppColors.danger,
              onPressed: () => _confirmDelete(context),
            ),
          IconButton(
            icon: const Icon(Icons.share_rounded),
            onPressed: () {/* share QR / link */},
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.pageGutter),
        children: [
          _HeaderCard(server: s, ping: ping, testing: _testing),
          const SizedBox(height: AppSpacing.md),
          Row(children: [
            Expanded(
              child: OutlinedButton.icon(
                icon: _testing
                    ? const SizedBox(
                        width: 16,
                        height: 16,
                        child:
                            CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Icon(Icons.speed_rounded),
                label: Text(_testing ? 'Testing…' : 'Test ping'),
                onPressed: _testing ? null : _runPingTest,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: FilledButton.icon(
                icon: const Icon(Icons.power_settings_new_rounded, size: 18),
                label: const Text('Connect'),
                onPressed: () {
                  context.read<SubscriptionProvider>().selectServer(s.id);
                  Navigator.of(context).pop();
                },
              ),
            ),
          ]),
          const SizedBox(height: AppSpacing.lg),
          _SectionLabel('Configuration'),
          _FormGroup(items: [
            _FormItem(
              label: 'Name',
              child: TextField(
                controller: _name,
                enabled: widget.editable,
                decoration: const InputDecoration(border: InputBorder.none),
              ),
            ),
            _FormItem(
              label: 'Address',
              child: Row(children: [
                Expanded(
                  child: TextField(
                    controller: _host,
                    enabled: widget.editable,
                    decoration:
                        const InputDecoration(border: InputBorder.none),
                  ),
                ),
                const Text(':', style: TextStyle(color: AppColors.textMuted)),
                SizedBox(
                  width: 64,
                  child: TextField(
                    controller: _port,
                    enabled: widget.editable,
                    keyboardType: TextInputType.number,
                    decoration:
                        const InputDecoration(border: InputBorder.none),
                  ),
                ),
              ]),
            ),
            _FormItem(
              label: 'Protocol',
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: _protocol,
                  isExpanded: true,
                  onChanged: widget.editable
                      ? (v) => setState(() => _protocol = v ?? _protocol)
                      : null,
                  items: const [
                    DropdownMenuItem(value: 'VLESS', child: Text('VLESS')),
                    DropdownMenuItem(value: 'VMess', child: Text('VMess')),
                    DropdownMenuItem(
                        value: 'Shadowsocks', child: Text('Shadowsocks')),
                    DropdownMenuItem(
                        value: 'WireGuard', child: Text('WireGuard')),
                    DropdownMenuItem(
                        value: 'OpenVPN', child: Text('OpenVPN')),
                  ],
                ),
              ),
            ),
            _FormItem(
              label: 'Security',
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: _security,
                  isExpanded: true,
                  onChanged: widget.editable
                      ? (v) => setState(() => _security = v ?? _security)
                      : null,
                  items: const [
                    DropdownMenuItem(value: 'Reality', child: Text('Reality')),
                    DropdownMenuItem(value: 'TLS', child: Text('TLS')),
                    DropdownMenuItem(value: 'None', child: Text('None')),
                  ],
                ),
              ),
            ),
            _FormItem(
              label: 'SNI',
              child: TextField(
                controller: _sni,
                enabled: widget.editable,
                decoration: const InputDecoration(border: InputBorder.none),
              ),
            ),
          ]),
          if (!widget.editable) ...[
            const SizedBox(height: AppSpacing.sm),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Text(
                'Imported via subscription — values are read-only.',
                style: theme.textTheme.bodySmall
                    ?.copyWith(color: AppColors.textMuted),
              ),
            ),
          ],
          const SizedBox(height: AppSpacing.xxl),
        ],
      ),
    );
  }

  Future<void> _confirmDelete(BuildContext context) async {
    final ok = await showDialog<bool>(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Delete server?'),
        content: const Text('This server will be removed from the list.'),
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

class _HeaderCard extends StatelessWidget {
  final Server server;
  final int ping;
  final bool testing;
  const _HeaderCard({
    required this.server,
    required this.ping,
    required this.testing,
  });
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(AppSpacing.radiusLg),
      ),
      child: Column(children: [
        Row(children: [
          Container(
            width: 48, height: 48,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: const Color(0xFFECEFF1),
            ),
            alignment: Alignment.center,
            child: Text(server.flagCode,
                style: const TextStyle(fontWeight: FontWeight.w600)),
          ),
          const SizedBox(width: AppSpacing.sm),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(server.displayName, style: theme.textTheme.titleMedium),
                const SizedBox(height: 2),
                Text(server.flagCode,
                    style: theme.textTheme.bodySmall
                        ?.copyWith(color: AppColors.textMuted)),
              ],
            ),
          ),
        ]),
        const SizedBox(height: AppSpacing.md),
        Row(children: [
          Expanded(
            child: _Stat(
              label: 'Latency',
              value: testing ? '…' : '$ping ms',
              color: AppColors.pingColor(ping),
            ),
          ),
          Container(width: 1, height: 32, color: theme.dividerColor),
          Expanded(
              child: _Stat(label: 'Load', value: '32%', color: AppColors.success)),
          Container(width: 1, height: 32, color: theme.dividerColor),
          Expanded(
              child: _Stat(
                  label: 'Distance', value: '1 240 km', color: AppColors.textMuted)),
        ]),
      ]),
    );
  }
}

class _Stat extends StatelessWidget {
  final String label;
  final String value;
  final Color color;
  const _Stat(
      {required this.label, required this.value, required this.color});
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Text(value,
          style: TextStyle(
              fontSize: 16, fontWeight: FontWeight.w600, color: color)),
      const SizedBox(height: 2),
      Text(label,
          style: const TextStyle(fontSize: 12, color: AppColors.textMuted)),
    ]);
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

class _FormGroup extends StatelessWidget {
  final List<_FormItem> items;
  const _FormGroup({required this.items});
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
      ),
      child: Column(children: [
        for (var i = 0; i < items.length; i++) ...[
          items[i],
          if (i < items.length - 1)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Divider(height: 1, color: theme.dividerColor),
            ),
        ]
      ]),
    );
  }
}

class _FormItem extends StatelessWidget {
  final String label;
  final Widget child;
  const _FormItem({required this.label, required this.child});
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md, vertical: 6),
      child: Row(children: [
        SizedBox(
          width: 96,
          child: Text(label,
              style: const TextStyle(color: AppColors.textMuted)),
        ),
        Expanded(child: child),
      ]),
    );
  }
}
