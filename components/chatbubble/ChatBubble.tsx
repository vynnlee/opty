import React from 'react'
import styles from './ChatBubble.module.css' // CSS 모듈 임포트

interface ChatBubbleProps {
  message: string
  isSent: boolean
  timestamp?: string
  showTimestamp?: boolean // 타임스탬프 표시 여부를 결정하는 프롭
  sentBgColor?: string
  receivedBgColor?: string
  sentTextColor?: string
  receivedTextColor?: string
  timestampColor?: string
  className?: string // 추가: 사용자 정의 클래스
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isSent,
  timestamp,
  showTimestamp = true, // 기본값: true (타임스탬프 표시)
  sentBgColor = '#0B93F6',
  receivedBgColor = '#E5E5EA',
  sentTextColor = 'white',
  receivedTextColor = 'black',
  timestampColor = 'gray',
  className, // 사용자 정의 클래스 받기
}) => {
  return (
    <div
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} ${className}`}
    >
      <div className="flex flex-col gap-[3px]">
        <div
          className={`${styles.bubble} ${isSent ? styles.sent : styles.receive} text-sm leading-normal`}
          style={{
            backgroundColor: isSent ? sentBgColor : receivedBgColor,
            color: isSent ? sentTextColor : receivedTextColor,
          }}
        >
          {message}
        </div>
        {showTimestamp && timestamp && (
          <span
            className={styles.timestamp}
            style={{
              color: timestampColor,
              textAlign: isSent ? 'right' : 'left',
            }}
          >
            {timestamp}
          </span>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
