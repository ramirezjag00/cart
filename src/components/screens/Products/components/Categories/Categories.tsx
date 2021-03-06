import React, { ReactElement } from 'react'
import { FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'

import CategoryItem from './CategoryItem'
import rem from '@utils/remSizeCalculator'

interface Props {
  data: string[]
  activeCategory: string
  setCategory: (item: string) => void
}

const keyExtractor = (_: string, index: number): string => index.toString()

const Categories: React.FC<Props> = (props) => {
  const { activeCategory, data, setCategory } = props
  const onItemPress = (item: string) => (): void => setCategory(item)

  const renderItem = ({ item }: { item: string }): ReactElement => {
    const productStyle = EStyleSheet.flatten([
      styles.categoryContainer,
      activeCategory === item && styles.activeCategory,
    ])
    return (
      <CategoryItem onPress={onItemPress} style={productStyle} title={item} />
    )
  }

  return (
    <FlatList
      data={data}
      extraData={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.flatListContainer}
    />
  )
}

const styles = EStyleSheet.create({
  flatListContainer: {
    borderBottomWidth: rem(1),
    borderBottomColor: '$mercury',
  },
  categoryContainer: {
    padding: rem(14),
    paddingVertical: rem(5),
  },
  activeCategory: {
    backgroundColor: 'transparent',
    borderBottomColor: '$laurel',
    borderBottomWidth: rem(3),
    borderRadius: rem(1.5),
  },
})

export default Categories
