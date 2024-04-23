import { ethers } from "ethers"
import "./Buy.css";
import { Input } from "@web3uikit/core";
import { User } from '@web3uikit/icons'



const Buy = ({ state }) => {

  const buyKomaTips = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    //const amount = document.querySelector("#amount").value;
    const amount = { value: ethers.utils.parseEther("0.000001") }
    const transaction = await contract.buyKomaTips(name, message, amount)
    await transaction.wait();
    alert("Transaction is successul");
    window.location.reload();
  }
  return (
    <div className="center">
      <h1>Thanks</h1>
      <form onSubmit={buyKomaTips}>
        <div className="">
          <Input
            label="Name"
            name=""
            onBlur={function noRefCheck() { }}
            onChange={function noRefCheck() { }}
            prefixIcon={<User />}
            required="required"
            id="name"
          />

        </div>
        <div className="">
          <input type="text" required="required" id="message" />
          <span>Message</span>
        </div>
        <div className="inputbox">
          <input type="submit" value="Pay" disabled={!state.contract} />
        </div>
      </form>

    </div>
  );
}
export default Buy;