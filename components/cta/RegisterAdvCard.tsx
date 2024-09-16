import React from 'react'
import ChatBubble from '@/components/chatbubble/ChatBubble'

export default function RegisterAdvCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 p-4">
      <ChatBubble
        message="붓으로 쓴 듯한 글꼴 찾아줘"
        isSent={true}
        sentBgColor="#007AFF"
        sentTextColor="#fff"
        showTimestamp={false}
      />
      <ChatBubble
        message="부리체 글꼴을 찾을게요"
        isSent={false}
        receivedBgColor="#f0f0f0"
        receivedTextColor="#333"
        showTimestamp={false}
        className="mt-2"
      />
      <h1 className="mt-3 text-lg font-semibold text-neutral-900">
        느낌으로 물어보기.
      </h1>
      <p className="font-regular mt-2 text-sm text-neutral-500">
        원하는 글꼴을 AI에게 물어보면 대신 찾아드려요.
      </p>
    </div>
  )
}
