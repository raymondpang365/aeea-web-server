import Head from 'next/head'
import { fetchEntries } from '@utils/contentfulPosts'
import safeJsonStringify from 'safe-json-stringify';
import Footer from '@components/Footer'
import Post from '@components/Post'
import st from './test.module.scss'
import React from "react";
import Nav from "@components/Nav"

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <style jsx global>{`
      body {
        margin: 0;
      }
    `}</style>
      <Head>
        <title>AEEA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={st.app}>

        <Nav/>

        <div>
          <div className={st.appHeader}>
            <div className={st.appHeaderTextContainer}>
              <h2 className={st.appHeaderText}>成功是1%的天才，加上99%的努力</h2>
            </div>
            <img className={st.coolPic1} src={"/hongkong.png"}>
            </img>
            <img className={st.coolPic2} src={"/hongkong.png"}>
            </img>
          </div>
        </div>
        <div className={st.posts}>
          {posts.map((p) => {
            return <Post key={p.date} date={p.date} image={p.image.fields} title={p.title} />
          })}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetchEntries()
  const stringifiedData = safeJsonStringify(res)
  const data = JSON.parse(stringifiedData)
 // console.log(data)
  const posts = await data.map((p) => {
    return p.fields
  })

  return {
    props: {
      posts,
    },
  }
}
