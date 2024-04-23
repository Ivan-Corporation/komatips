import { ethers } from "ethers"
import "./Buy.css";
import { Button, Card, Illustration, Input } from "@web3uikit/core";
import { User, MessageCircle } from '@web3uikit/icons'


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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div

      >
        <Card
          description="Required Metamask wallet"
          onClick={function noRefCheck() { }}
          setIsSelected={function noRefCheck() { }}
          title=""
          tooltipText={<span style={{ width: 200 }}>Fund a smart contract chest with cryptogold!</span>}
        >
          <div>
            <Illustration
              height="180px"
              logo="chest"
              width="100%"
            />
          </div>

          <form onSubmit={buyKomaTips}>
            <div className="" style={{ marginBottom: '30px' }}>
              <div>Name</div>
              <Input
                label=""
                className="input_text"
                name=""
                onBlur={function noRefCheck() { }}
                onChange={function noRefCheck() { }}
                prefixIcon={<User />}
                required="required"
                id="name"
              />
            </div>

            <div className="" style={{ marginBottom: '30px' }}>
              <div>Message</div>
              <Input
                label=""
                className="input_text"
                name=""
                onBlur={function noRefCheck() { }}
                onChange={function noRefCheck() { }}
                prefixIcon={<MessageCircle />}
                required="required"
                id="message"
              />
            </div>


            <Button
              color="blue"
              iconLayout="leading"
              isFullWidth
              size="large"
              text="Pay"
              theme="colored"
              type="submit"
              disabled={!state.contract}
            />
          </form>

        </Card>
      </div>
    </div>
  );
}
export default Buy;