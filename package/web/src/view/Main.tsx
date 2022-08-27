import "@rainbow-me/rainbowkit/styles.css";
import "./Main.css";

import { Signer, ethers } from "ethers";
import * as React from "react";
import { useMemo } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Provider } from "@wagmi/core";
import { useProvider, useSigner } from "wagmi";
import { Hodl, factories } from "../../types/ethers-contracts";

const HodlRopstenAddr = "0x032c93f5ed76242771f5b7807b9eb7f1bcdc199a";

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
  state = { balance: 0, releaseTime: 0 };

  constructor(props: Props) {
    super(props);
    // why do i have to do this bind thing?
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  componentDidMount() {
    setInterval(this.reload, 5000);
  }

  reload = async () => {
    this.props.hodlContract
      .balanceOf(this.props.hodlContract.signer.getAddress())
      .then((depositAmount) => {
        this.setState({ balance: depositAmount.toNumber() });
      });
    this.props.hodlContract["getReleaseTime(address)"](
      this.props.hodlContract.signer.getAddress()
    ).then((releaseTime) => {
      this.setState({ releaseTime: releaseTime.toNumber() });
    });
  };

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const deposit = parseInt(form.elements["name"].value);
    const tx = this.props.hodlContract.deposit({ value: deposit });
  }

  handleWithdraw() {
    this.props.hodlContract.withdraw();
  }

  render() {
    const releaseDate = new Date(this.state.releaseTime * 1000);
    return (
      <main>
        <h1>HODL HELPER</h1>
        <div>Deposit eth. Gets locked for 100 seconds.</div>
        <br></br>
        <div>
          You have <strong>{this.state.balance}</strong> wei deposited.
        </div>
        <div>
          You can withdraw at{" "}
          <strong>{releaseDate.toLocaleTimeString()}</strong>.
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Deposit (wei):
            <input type="text" name="name" />
          </label>
          <input type="submit" value="HODL" />
        </form>
        <button onClick={this.handleWithdraw}>Withdraw everything</button>
      </main>
    );
  }
}
