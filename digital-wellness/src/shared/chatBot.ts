const supportiveReplies = [
  'I understand. Can you tell me more?',
  'That sounds tough. What do you think might help right now?',
  'Thanks for sharing. I\'m here with you. Would a short breathing exercise help?',
  'Noted. Remember, your feelings are valid. What\'s one small step you could take?',
  'I\'m listening. Would you like to try a relaxing game for a break?',
]

export function generateBotReply(userText: string): string {
  const lower = userText.toLowerCase()
  if (lower.includes('game') || lower.includes('play')) {
    return 'Let\'s take a gentle break. Head to Games to try one you like.'
  }
  if (lower.includes('anx') || lower.includes('stress')) {
    return 'Try a 4-7-8 breath: inhale 4s, hold 7s, exhale 8s. How do you feel?'
  }
  if (lower.includes('sad') || lower.includes('down')) {
    return 'I\'m sorry you\'re feeling that way. What usually brings you comfort?'
  }
  return supportiveReplies[Math.floor(Math.random() * supportiveReplies.length)]
}

