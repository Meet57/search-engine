import React,{useEffect,useState} from 'react';
import '../styles/SplashScreen.css';
import splash from '../assets/images/splash2.jpg';

const SplashScreen=() => {
    const [visible,setVisible]=useState(true);

    useEffect(() => {
        // Simulate loading process
        const timer=setTimeout(() => {
            setVisible(false);
        },2000); // Adjust the duration as needed

        return () => clearTimeout(timer);
    },[]);

    return (
        <div className={`splash-screen ${visible? '':'hidden'}`}>
            <img
                src={splash}
                alt="Splash Screen Image"
                className="splash-screen-image"
            />
        </div>
    );
};

export default SplashScreen;
