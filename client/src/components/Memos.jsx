import { useState, useEffect } from "react";
import "./Memos.css"
import { ethers } from "ethers";
import { Avatar, Table, Tag } from "@web3uikit/core";

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;
  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMemos(memos)
      // console.log('memos', memos)
    }
    contract && memosMessage()
  }, [contract])
  return (
    <div className="container-fluid">
      <h3 style={{ textAlign: "center", marginTop: "50px" }}>Messages</h3>

      <Table

        columnsConfig="5% 15% 15% 15% 27% 25%"
        data={
          memos?.slice().reverse().map((memo) => {
            return (
              [
                <Avatar isRounded
                  size={36}
                  text={memo.name}
                  characterAmount={2}
                  theme="letters" />,
                ethers.utils.formatEther(memo.value._hex),
                <Tag color="blue" text={memo.name} />,
                new Date(memo.timestamp * 1000).toLocaleString(),
                memo?.message.length > 25 ? memo?.message.substring(0, 36) + '...' : memo.message,
                memo.from?.substring(0, 16) + '....' + memo.from?.substring(memo.from?.length - 4)
              ]
            )
          })


        }
        header={[
          '',
          <span>Value</span>,
          <span>Name</span>,
          <span>Date</span>,
          <span>Message</span>,
          <span>Account</span>,

        ]}
        maxPages={100}
        pageSize={10}
      />

    </div>
  );
}
export default Memos;