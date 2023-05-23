import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { LangStructure } from '../../translations/types'
import Span from '../../ui/Span'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import { infoPopUpFactory } from './factories'

type UploadRequestTextProps = {
  text: LangStructure
}
const UploadRequestText = ({ text }: UploadRequestTextProps) => {
  const styles = useThemedStyle(themedStyles)
  const navigate = useNavigate()

  return (
    <Span weight={600}>
      {text.childIdentityUploadRequest.text + ' '}
      <Span
        weight={600}
        style={styles.link}
        onPress={() => {
          navigate(links.editProfile)
          ChildIdentityUploadRequest.hideSync()
        }}
        label={text.childIdentityUploadRequest.link}
      />
    </Span>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    link: {
      color: colors.primary1,
      textDecorationLine: 'underline',
    },
  })
)

const ChildIdentityUploadRequest = infoPopUpFactory.create({
  title: (text) => <UploadRequestText text={text} />,
})

export default ChildIdentityUploadRequest
