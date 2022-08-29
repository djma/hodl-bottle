import "@rainbow-me/rainbowkit/styles.css";
import "./Main.css";

import { utils } from "ethers";
import * as React from "react";
import { useMemo } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Provider } from "@wagmi/core";
import { useProvider, useSigner } from "wagmi";
import { Hodl, factories } from "../../types/ethers-contracts";
import bottle from "../../images/bottle-of-colored-sand.svg";
import ethlogo from "../../images/eth-logo.svg";

const HodlRopstenAddr = "0xce65acc0d5fa345f86680a8941ca285a9bc7214b";

export default function Main() {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const hodlContract = useMemo(
    function () {
      return factories.Hodl__factory.connect(
        HodlRopstenAddr,
        signer || provider
      );
    },
    [provider, signer]
  );

  return (
    <main>
      <ConnectButton />
      <br></br>
      <HodlDisplay hodlContract={hodlContract} />
    </main>
  );
}

interface Props {
  hodlContract: Hodl;
}
export class HodlDisplay extends React.PureComponent<Props> {
  state = { balance: "0", releaseTime: 0, hodlDuration: 300 };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    setInterval(this.reload, 5000);
  }

  reload = async () => {
    this.props.hodlContract
      .lockedBalance(this.props.hodlContract.signer.getAddress())
      .then((depositAmount) => {
        this.setState({ balance: depositAmount });
      });
    this.props.hodlContract["releaseTime(address)"](
      this.props.hodlContract.signer.getAddress()
    ).then((releaseTime) => {
      this.setState({ releaseTime: releaseTime.toNumber() });
    });
  };

  handleSubmitHodl = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const ethDepositAmount = form.elements["name"].value;
    const tx = this.props.hodlContract.deposit(this.state.hodlDuration, {
      value: utils.parseEther(ethDepositAmount),
    });
  };

  handleWithdraw = () => {
    this.props.hodlContract.withdraw();
  };

  handleSelect = (event) => {
    this.setState({ hodlDuration: event.target.value });
  };

  render() {
    const releaseDate = new Date(this.state.releaseTime * 1000);
    return (
      <main>
        <h1>HODL BOTTLE</h1>
        <div
          style={{
            backgroundImage: `url(${bottle})`,
            backgroundRepeat: `no-repeat`,
          }}
        >
          <img className="eth-logo" src={ethlogo} alt="ethlogo" />
        </div>
        <div>Deposit eth. Turn paper hands into diamond hands.</div>
        <ul>
          <li>No airdrop, no gov coin, no nft</li>
          <li>No yield, no defi</li>
          <li>No deposit receipt, no composability</li>
          <li>No DAO, no upgradability</li>
          <li>No audits (Actually, audited by John. Trust John.)</li>
          <li>Only HODL</li>
        </ul>
        <br></br>
        <label>HODL duration: </label>
        <select name="selectList" id="selectList" onChange={this.handleSelect}>
          <option value="300">5 minutes</option>
          <option value="86400">1 day</option>
          <option value="604800">1 week</option>
          <option value="2592000">1 month</option>
          <option value="31536000">1 year</option>
        </select>
        <form onSubmit={this.handleSubmitHodl}>
          <label>
            Deposit (eth):
            <input type="text" name="name" />
          </label>
          <input type="submit" value="HODL" />
        </form>
        <br></br>
        <div>
          You have <strong>{utils.formatEther(this.state.balance)}</strong> eth
          deposited.
        </div>
        {this.state.balance > "0" && (
          <div>
            You can withdraw{" "}
            <strong>
              {releaseDate < new Date()
                ? "now"
                : "after " + releaseDate.toLocaleString()}
              .
            </strong>
          </div>
        )}
        <button onClick={this.handleWithdraw}>Withdraw everything</button>
        <br></br>
      </main>
    );
  }
}
