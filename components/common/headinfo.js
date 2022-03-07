import React from 'react';
import Head from 'next/head'

export default function HeadInfo(props) {
    return (
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href='/favicon.ico' />
        <meta charSet="UTF-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <meta  httpEquiv="X-UA-Compatible" content="ie=edge"></meta>
        <meta name="description" content={props.description} />
        <meta name="keywords" content="..."></meta>
      </Head>
    );
}
