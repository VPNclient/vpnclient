import 'package:flutter/material.dart';

// Support chat screen (Figma Settings/Support-Start & Support-Open):
// welcome message from the bot, mock conversation, "+" attach menu, composer.
class SupportChatPage extends StatefulWidget {
  const SupportChatPage({super.key});

  @override
  State<SupportChatPage> createState() => _SupportChatPageState();
}

const _primaryText = Color(0xFF303F49);
const _muted = Color(0xFF959595);

class _ChatMessage {
  final String text;
  final bool fromUser;
  final String time;
  const _ChatMessage(this.text, this.fromUser, this.time);
}

class _SupportChatPageState extends State<SupportChatPage> {
  final TextEditingController _controller = TextEditingController();
  final List<_ChatMessage> _messages = const [
    _ChatMessage(
      'Добро пожаловать в чат поддержки. Поможем вам с любыми вопросами 24 часа в сутки 7 дней в неделю.',
      false,
      '14:28 Бот',
    ),
    _ChatMessage(
      'Здравствуйте, нажимаю кнопку подключения, но ничего не происходит.',
      true,
      '15:11',
    ),
  ].toList();

  bool _showAttach = false;

  void _send() {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    setState(() {
      _messages.add(_ChatMessage(text, true, 'Сейчас'));
      _controller.clear();
      _showAttach = false;
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, color: _primaryText, size: 20),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: const Text(
          'Чат с поддержкой',
          style: TextStyle(
            color: _primaryText,
            fontSize: 24,
            fontWeight: FontWeight.w600,
          ),
        ),
        centerTitle: true,
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.fromLTRB(30, 20, 30, 20),
                itemCount: _messages.length,
                itemBuilder: (context, i) {
                  final m = _messages[i];
                  final showDateLabel = i == 0 || i == _messages.length - 1
                      ? true
                      : false;
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 20),
                    child: Column(
                      crossAxisAlignment:
                          m.fromUser
                              ? CrossAxisAlignment.end
                              : CrossAxisAlignment.start,
                      children: [
                        if (showDateLabel)
                          Padding(
                            padding: const EdgeInsets.only(bottom: 8),
                            child: Text(
                              i == 0 ? '18 апреля 2025' : 'Сегодня',
                              style: const TextStyle(fontSize: 13, color: _muted),
                            ),
                          ),
                        Container(
                          constraints: const BoxConstraints(maxWidth: 270),
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color:
                                m.fromUser
                                    ? const Color(0xFFE0EEFF)
                                    : Colors.white,
                            border: Border.all(color: const Color(0xFFE0E0E0)),
                            borderRadius: BorderRadius.only(
                              topLeft: const Radius.circular(10),
                              topRight: const Radius.circular(10),
                              bottomLeft: Radius.circular(m.fromUser ? 10 : 14),
                              bottomRight: Radius.circular(m.fromUser ? 14 : 10),
                            ),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                m.text,
                                style: const TextStyle(fontSize: 17, color: _primaryText),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                m.time,
                                style: const TextStyle(fontSize: 13, color: _muted),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            if (_showAttach)
              Padding(
                padding: const EdgeInsets.fromLTRB(30, 0, 30, 10),
                child: Row(
                  children: [
                    _attachButton(Icons.attach_file, 'Файл', () {}),
                    const SizedBox(width: 14),
                    _attachButton(Icons.screenshot, 'Скриншот', () {},
                        gradient: true),
                  ],
                ),
              ),
            Padding(
              padding: const EdgeInsets.fromLTRB(30, 0, 30, 14),
              child: Row(
                children: [
                  _roundIconButton(
                    _showAttach ? Icons.close : Icons.add,
                    () => setState(() => _showAttach = !_showAttach),
                  ),
                  const SizedBox(width: 4),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: const Color(0xFFE0E0E0)),
                      ),
                      child: TextField(
                        controller: _controller,
                        onSubmitted: (_) => _send(),
                        decoration: const InputDecoration(
                          hintText: 'Сообщение',
                          hintStyle: TextStyle(color: Color(0xFFB6B6B6)),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send, color: Color(0xFF005BEA)),
                    onPressed: _send,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _roundIconButton(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 40,
        height: 40,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
          border: Border.all(color: const Color(0xFFE0E0E0)),
        ),
        child: Icon(icon, size: 22, color: _primaryText),
      ),
    );
  }

  Widget _attachButton(
    IconData icon,
    String label,
    VoidCallback onTap, {
    bool gradient = false,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFFE0E0E0)),
              gradient:
                  gradient
                      ? const LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Color(0xFF00C6FB), Color(0xFF005BEA)],
                      )
                      : null,
              color: gradient ? null : Colors.white,
            ),
            child: Icon(icon, size: 20, color: gradient ? Colors.white : _primaryText),
          ),
          const SizedBox(width: 8),
          Text(label, style: const TextStyle(fontSize: 17, color: _primaryText)),
        ],
      ),
    );
  }
}
