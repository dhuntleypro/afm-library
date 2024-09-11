import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import CustomLink from '../../CustomLink'
import Head from 'expo-router/head'
import SEOHeader from '@/components/SEOHeader'
import CustomLink from '@/components/CustomLink'
// import SEOHeader from '../../SEOHeader'

const SettingsPageWeb = () => {
  return (
    <>
    {/* <Head>
        <title>Settings</title>
        <meta name='description' content='Change your settings' />
    </Head> */}

    <SEOHeader title={'Settings'} content={'Change your settings'} />
      <h2>settings</h2>
      <CustomLink url={'/'} title={'sign out'} replace />
    </>
  )
}

export default SettingsPageWeb

const styles = StyleSheet.create({})