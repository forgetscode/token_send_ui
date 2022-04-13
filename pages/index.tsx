import type { NextPage } from 'next'
import { Nav } from '../components/Nav';
import { Send } from '../components/Send';
import { SendNFT } from '../components/SendNFT';
import { SendToken } from '../components/SendToken';

const Home: NextPage = ({}) => {
  return (
    <>
      <Nav>
        <Send/>
        <div className="mb-5"/>
        <SendToken/>
        <div className="mb-5"/>
        <SendNFT/>
      </Nav>
    </>
  );
}

export default Home
