import 'package:flutter/material.dart';
import 'package:vpn_client/localization_service.dart';

class SupportServiceCard extends StatelessWidget {
  final VoidCallback? onTap;

  const SupportServiceCard({super.key, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
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
      child: InkWell(
        onTap: onTap,
        child: Row(
          children: [
            Container(
              width: 24,
              height: 24,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(4),
              ),
              child: Image.asset(
                'assets/images/support_icons.png',
                width: 16,
                height: 16,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                LocalizationService.to('support_service'),
                style: const TextStyle(fontSize: 16, color: Color(0xFF303F49)),
              ),
            ),
            Icon(Icons.chevron_right, color: Colors.grey[400], size: 20),
          ],
        ),
      ),
    );
  }
}
