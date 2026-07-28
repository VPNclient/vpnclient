import 'package:flutter/material.dart';
import 'package:vpn_client/localization_service.dart';

class SettingInfoCard extends StatelessWidget {
  final bool isConnected;
  final String connectionStatus;
  final String supportStatus;
  final String userId;

  const SettingInfoCard({
    super.key,
    required this.isConnected,
    required this.connectionStatus,
    required this.supportStatus,
    required this.userId,
  });

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
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10),
            child: Align(
              alignment: Alignment.centerLeft,
              child: Text(
                LocalizationService.to('about_app'),
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Color(0xFFB6B6B6),
                ),
              ),
            ),
          ),
          _buildSettingRow(
            LocalizationService.to('version'),
            'v 1.0',
            Colors.orange,
          ),
          _buildSettingRow(
            LocalizationService.to('connection'),
            isConnected
                ? connectionStatus
                : LocalizationService.to('not_connected'),
            isConnected ? Colors.orange : Colors.red,
          ),
          _buildSettingRow(
            LocalizationService.to('support'),
            isConnected ? supportStatus : LocalizationService.to('unavailable'),
            isConnected ? Colors.orange : Colors.grey,
          ),
          _buildSettingRow(
            LocalizationService.to('your_id'),
            isConnected ? userId : '—',
            isConnected ? Colors.grey[600]! : Colors.grey,
          ),
        ],
      ),
    );
  }

  Widget _buildSettingRow(String label, String value, Color valueColor) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: const TextStyle(fontSize: 16, color: Color(0xFF303F49)),
          ),
          Text(
            value,
            style: TextStyle(
              fontSize: 16,
              color: valueColor,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
