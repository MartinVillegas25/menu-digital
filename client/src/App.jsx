import './App.css';

import NavBar from './Components/NavBar/NavBar';
import FirstView from './Components/FirstView/FirstView';
import AboutUs from './Components/AboutUs/AboutUs';
import AppDetails from './Components/AppDetails/AppDetails';
import Testimonials from './Components/Testimonials/Testimonials';
import Subscription from './Components/Subscription/Subscription';
import Footer from './Components/Footer/Footer';

function App() {
	return (
		<div className="App">
			<NavBar />
			<section>
				<FirstView />
			</section>
			<section id="nosotros">
				<AboutUs />
			</section>
			<section>
				<AppDetails />
			</section>
			<section id="testimonios">
				<Testimonials />
			</section>
			<section id="suscripcion">
				<Subscription />
			</section>
			<section>
				<Footer />
			</section>
		</div>
	);
}

/* <NavBar />
			<FirstView />
			<AboutUs />
			<AppDetails />
			<Testimonials />
			<Subscription />
			<Footer /> */

export default App;
