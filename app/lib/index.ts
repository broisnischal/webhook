

export async function notifySlack(message: string) {
  try {
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
    console.log('✅ Notification sent to Slack');
  } catch (error) {
    console.log('❌ Failed to send Slack notification:', error);
  }
}