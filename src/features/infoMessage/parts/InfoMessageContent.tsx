import React from 'react'
import { StyleSheet, View } from 'react-native'
import Span from '../../../ui/Span'
import { SVGImageProps } from '../../../ui/images/_types'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { InfoMessageScreenVariant } from '../types'

type InfoMessageLabelProps = {
  title: string
  subTitle?: string
  Image: (props: SVGImageProps) => React.ReactElement
  variant?: InfoMessageScreenVariant
}

const InfoMessageContent = ({
  title,
  subTitle,
  Image,
  variant = 'primary',
}: InfoMessageLabelProps) => {
  const { styles } = useThemedStyleList({
    common: themedStyles,
    light: lightThemedStyles,
  })

  const isLight = variant === 'light'
  return (
    <View style={styles.common.container}>
      <Image />
      <View style={styles.common.titleContainer}>
        <Span
          weight={600}
          style={[styles.common.title, isLight && styles.light.title]}
          label={title}
        />
        {subTitle && (
          <Span
            weight={500}
            style={[styles.common.subTitle, isLight && styles.light.subTitle]}
            label={subTitle}
          />
        )}
      </View>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    titleContainer: {
      marginTop: 40,
      paddingHorizontal: 25,
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      color: colors.whiteText,
      lineHeight: 32.65,
    },
    subTitle: {
      textAlign: 'center',
      fontSize: 16,
      lineHeight: 21,
      marginTop: 12,
      color: colors.primary2,
    },
  })
)

const lightThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    title: {
      color: colors.text,
    },
    subTitle: {
      color: colors.subText,
    },
  })
)

export default InfoMessageContent
