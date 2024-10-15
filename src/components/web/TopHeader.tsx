import { View, Text } from 'react-native'
import React from 'react'
import CustomLink from '../CustomLink'
// import CustomLink from '../CustomLink'

export default function TopHeader() {
  return (
    <div>
        <header>
            <div
                style={{
                    display: 'flex',
                    gap: 10,
                    padding: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundColor: '#c7c7c7'
                }}>

                    <CustomLink url={'/(tabs)/(products)/products'} title={'Products'} />
                    <CustomLink url={'/(tabs)/(products)/products'} title={'Products'} />
                    <CustomLink url={'/(tabs)/(products)/products'} title={'Products'} />
                                
            
            </div>
        </header>
    </div>
  )
}