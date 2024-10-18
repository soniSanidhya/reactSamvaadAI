import React from 'react';
import "./SettingStyles.css"
import { useSelector ,useDispatch } from 'react-redux';
import { setShow } from '../../functionality/sidePanelSlice';
function Setting(props) {
    const dispatch = useDispatch();
    const show = useSelector(state => state.side.show)
    return (
//         <div className=' h-screen w-full bg-violet-900' >
//             <div className='flex w-full'>{!show && <button onClick={() => {dispatch(setShow(true))}} className="p-1"><svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24" fill="none">
// <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// </svg></button>}
//             <h1 className="text-white text-center text-5xl  " >Settings</h1></div>

//         </div>
        <div className="container1 mx-20">
        <div className='flex'>
        {!show && <button onClick={() => {dispatch(setShow(true))}} className="p-1"><svg xmlns="http://www.w3.org/2000/svg" width="2.4em" height="2.4em" viewBox="0 0 24 24" fill="none">
// <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// </svg></button>}
        <div className="flex-1"><h1>ChatPDF Settings</h1></div>
        </div>
        <ul class="settings-list">
            <li class="settings-item">
                <span class="setting-label">Notification Sounds</span>
                <span class="setting-description">Enable or disable notification sounds</span>
                <label>
                    <input type="checkbox" class="setting-input"/> Enable Notification Sounds
                </label>
            </li>
            <li class="settings-item">
                <span class="setting-label">Theme</span>
                <span class="setting-description">Select the theme for the ChatPDF interface</span>
                <select class="setting-select">
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                </select>
            </li>
            <li class="settings-item">
                <span class="setting-label">Language</span>
                <span class="setting-description">Select your preferred language</span>
                <select class="setting-select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                </select>
            </li>
        </ul>
    </div>
    );
}

export default Setting;