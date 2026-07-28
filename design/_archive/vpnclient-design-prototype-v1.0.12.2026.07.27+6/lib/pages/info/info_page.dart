import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

// Speed-test screen (per Figma Info-Not-Ready: Info-Default / Info-Test-*),
// mounted on the previously-unused "Speed" tab.
class InfoPage extends StatefulWidget {
  const InfoPage({super.key});

  @override
  State<InfoPage> createState() => _InfoPageState();
}

const _primaryText = Color(0xFF303F49);
const _muted = Color(0xFFB6B6B6);
const _accentGradient = LinearGradient(
  colors: [Color(0xFF00C6FB), Color(0xFF005BEA)],
);
const List<int> _ticks = [5, 10, 50, 100, 250, 500, 750, 1000];

class _InfoPageState extends State<InfoPage>
    with SingleTickerProviderStateMixin {
  Map<String, dynamic>? _selectedServer;
  bool _running = false;
  double _speed = 0;
  Timer? _ticker;
  final _rand = Random();

  @override
  void initState() {
    super.initState();
    _loadSelectedServer();
  }

  Future<void> _loadSelectedServer() async {
    final prefs = await SharedPreferences.getInstance();
    final String? savedServers = prefs.getString('selected_servers');
    if (savedServers != null) {
      final List<dynamic> serversList = jsonDecode(savedServers);
      final activeServer = serversList.firstWhere(
        (server) => server['isActive'] == true,
        orElse: () => null,
      );
      if (mounted) {
        setState(() {
          _selectedServer =
              activeServer != null
                  ? Map<String, dynamic>.from(activeServer)
                  : null;
        });
      }
    }
  }

  void _toggleTest() {
    if (_running) {
      setState(() {
        _running = false;
        _speed = 0;
      });
      _ticker?.cancel();
      return;
    }
    final target = 30 + _rand.nextInt(920);
    setState(() {
      _running = true;
      _speed = 0;
    });
    _ticker = Timer.periodic(const Duration(milliseconds: 120), (t) {
      setState(() {
        _speed += (target - _speed) * 0.18 + _rand.nextDouble() * 4;
        if (_speed >= target - 1) {
          _speed = target.toDouble();
          _running = false;
          t.cancel();
        }
      });
    });
  }

  @override
  void dispose() {
    _ticker?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final locationName = _selectedServer?['text'] ?? 'Auto';
    final iconPath = _selectedServer?['icon'] ?? 'assets/images/flags/auto.svg';

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      appBar: AppBar(
        title: const Text('Speed Test'),
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: Theme.of(context).colorScheme.primary,
          fontSize: 24,
          fontWeight: FontWeight.w600,
        ),
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(30, 10, 30, 30),
          child: Column(
            children: [
              // Server-Info card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x1A9CB2C2),
                      blurRadius: 32,
                      offset: Offset(0, 1),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          locationName,
                          style: const TextStyle(
                            fontSize: 17,
                            color: _primaryText,
                          ),
                        ),
                        SvgPicture.asset(iconPath, width: 24, height: 24),
                      ],
                    ),
                    const Divider(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Server',
                          style: TextStyle(fontSize: 15, color: _muted),
                        ),
                        Text(
                          _selectedServer == null ? '—' : 'node-01',
                          style: const TextStyle(
                            fontSize: 15,
                            color: _primaryText,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Data used',
                          style: TextStyle(fontSize: 15, color: _muted),
                        ),
                        Text(
                          '12 Gb',
                          style: TextStyle(fontSize: 15, color: _primaryText),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 30),
              Row(
                children: const [
                  Text(
                    'Speed test',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w500,
                      color: _primaryText,
                    ),
                  ),
                  Spacer(),
                  Icon(Icons.help_outline, color: _muted),
                ],
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: 286,
                height: 286,
                child: CustomPaint(
                  painter: _GaugePainter(
                    progress: (log(1 + _speed) / log(1 + 1000)).clamp(0, 1),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          _speed.round().toString(),
                          style: const TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.w600,
                            color: _primaryText,
                          ),
                        ),
                        const Text(
                          'Mb/s',
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w600,
                            color: _muted,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: _toggleTest,
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        _running ? Colors.white : const Color(0xFF005BEA),
                    foregroundColor: _running ? Colors.red : Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  child: Text(
                    _running ? 'Остановить тест' : 'Начать тест',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _GaugePainter extends CustomPainter {
  final double progress;
  _GaugePainter({required this.progress});

  static const double _startDeg = 135;
  static const double _sweepDeg = 270;

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final center = rect.center;
    final radius = size.width / 2 - 14;
    final start = _startDeg * pi / 180;
    final sweep = _sweepDeg * pi / 180;

    final track =
        Paint()
          ..color = const Color(0xFFE0E0E0)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 20
          ..strokeCap = StrokeCap.round;
    canvas.drawArc(
      rect.deflate(14),
      start,
      sweep,
      false,
      track,
    );

    final progressPaint =
        Paint()
          ..shader = _accentGradient.createShader(rect)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 20
          ..strokeCap = StrokeCap.round;
    canvas.drawArc(
      rect.deflate(14),
      start,
      sweep * progress,
      false,
      progressPaint,
    );

    final textPainter = TextPainter(textDirection: TextDirection.ltr);
    for (int i = 0; i < _ticks.length; i++) {
      final angle = start + sweep * (i / (_ticks.length - 1));
      final pos = Offset(
        center.dx + (radius + 22) * cos(angle),
        center.dy + (radius + 22) * sin(angle),
      );
      textPainter.text = TextSpan(
        text: '${_ticks[i]}',
        style: const TextStyle(fontSize: 11, color: _muted),
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        pos - Offset(textPainter.width / 2, textPainter.height / 2),
      );
    }
  }

  @override
  bool shouldRepaint(covariant _GaugePainter oldDelegate) =>
      oldDelegate.progress != progress;
}
