import Link from "next/link";
import Base from '../components/base';
import '../styles/homepage.sass';

const HomePage = (props) => {
  return (
    <Base loginRequired >
      <h5>Home Page</h5>
      <Link href="/play"><button className="btn btn-primary rounded-0">Play</button></Link>
    </Base>

  )
};

export default HomePage;