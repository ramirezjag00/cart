import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { useThunkDispatch, useTypedSelector } from '@utils/store'
import { updateCart } from '@store/cart/actions'

import Product from '@customtypes/product'
import CartProduct from '@customtypes/cartProduct'
import QuantityController from '@common/QuantityController'
import Brand from '@common/Brand'
import rem from '@utils/remSizeCalculator'

interface Props {
  item: Product
}

const CategoryItem: React.FC<Props> = (props) => {
  const { item } = props
  const { price, name, brand } = item
  const cart = useTypedSelector((store) => store.cart)
  const dispatch = useThunkDispatch()
  const productCartIndex = cart.findIndex(
    (cartItem: CartProduct) => cartItem.item.id === item.id,
  )
  const onPress = (): void => {
    dispatch(
      updateCart({
        item,
        quantity: 1,
        amount: price,
      }),
    )
  }

  const onPressQuantity = (action: boolean) => (): void => {
    const modifiedQuantity = action
      ? cart[productCartIndex].quantity + 1
      : cart[productCartIndex].quantity - 1
    const modifiedCartProduct = {
      item,
      quantity: modifiedQuantity,
      amount: price * modifiedQuantity,
    }
    dispatch(updateCart(modifiedCartProduct))
  }

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.subDetails}>
          <Brand name={brand} />
          <Text style={styles.price}>₱{price.toFixed(2)}</Text>
        </View>
      </View>
      {productCartIndex === -1 ? (
        <TouchableOpacity onPress={onPress} style={styles.cartButton}>
          <Text style={styles.cartButtonLabel}>ADD TO CART</Text>
        </TouchableOpacity>
      ) : (
        <QuantityController
          onPress={onPressQuantity}
          quantity={cart[productCartIndex].quantity}
        />
      )}
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$white',
    paddingHorizontal: rem(20),
    paddingVertical: rem(16),
    borderBottomWidth: rem(1),
    borderBottomColor: '$mercury',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    paddingRight: rem(20),
  },
  title: {
    fontFamily: '$normal',
    fontSize: rem(14),
  },
  subDetails: {
    marginTop: rem(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  price: {
    alignSelf: 'center',
    fontFamily: '$medium',
    fontSize: rem(14),
  },
  cartButton: {
    width: '30%',
    borderWidth: rem(1),
    borderColor: '$laurel',
    paddingHorizontal: rem(10),
    paddingVertical: rem(10),
    borderRadius: rem(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonLabel: {
    color: '$laurel',
    fontFamily: '$normal',
    fontSize: rem(12),
  },
})

export default CategoryItem
