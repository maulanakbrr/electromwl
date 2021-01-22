import { Alert } from 'react-bootstrap' 

import { MessageContainer } from './Message.styles'

const Message = ({variant, children}) => {
  return (
    <MessageContainer>
      <Alert variant={variant}>
        {children}
      </Alert>
    </MessageContainer>
  )
}

Message.defaultProps = {
  variant: 'info'
}

export default Message
