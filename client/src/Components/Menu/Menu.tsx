import styles from './Menu.module.css';
import { Outlet, NavLink, useNavigate, NavigateFunction } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { GrUserWorker } from 'react-icons/gr';
import { FaTruckMoving } from 'react-icons/fa';
import { GiRoad } from 'react-icons/gi';
import { RiRoadMapLine } from 'react-icons/ri';
import '../../General css/scroll.css';
import domain from '../../config/serverDomain.config';
import request from '../../Tools/request.tool';

export default function Menu(): JSX.Element
{
      const navToggler = useRef<HTMLButtonElement | null>(null);
      const navbar = useRef<HTMLDivElement | null>(null);

      const [activeTab, setActiveTab] = useState<string>("");
      const [render, setRender] = useState<boolean>(false);
      const [showSidebar, setShowSidebar] = useState<boolean>(true);
      const [dynamicWidth, setDynamicWidth] = useState<string>('160px');
      const [dynamicOpacity, setDynamicOpacity] = useState<string>('1');

      const Navigate: NavigateFunction = useNavigate();

      useEffect(() =>
      {
            request.get(`https://${ domain }/`)
                  .then(res =>
                  {
                        if (!res.data.found)
                              Navigate('/');
                        else
                              setActiveTab(window.location.pathname);
                  })
                  .catch(error => console.log(error));

            trackWidth();

            document.addEventListener('mousedown', function (event): void
            {
                  // This event listener is used to close the side menu when the user clicked something outside of it.
                  // Check if clicked element is inside the side menu or the toggle button
                  if (event.target instanceof Node && navToggler.current && navbar.current && !navbar.current.contains(event.target) && !navToggler.current.contains(event.target))
                  {
                        if (showSidebar && window.innerWidth < 768)
                        {
                              setDynamicWidth('0');
                              setDynamicOpacity('0');
                              setShowSidebar(!showSidebar);
                        }
                  }
            });

            window.addEventListener('resize', trackWidth);

            return () =>
            {
                  window.removeEventListener('resize', trackWidth);
            };

            // eslint-disable-next-line
      }, [render, Navigate]);

      function handleToggleSidebar(): void
      {
            // Show or collapse the side menu
            if (showSidebar)
            {
                  setDynamicWidth('0');
                  setDynamicOpacity('0');
            }
            else
            {
                  setDynamicWidth('160px');
                  setDynamicOpacity('1');
            }
            setShowSidebar(!showSidebar);
      }

      function logOut(): void
      {
            request.delete(`https://${ domain }/logout`)
                  .then(res =>
                  {
                        Navigate('/');
                  })
                  .catch(error => console.log(error));
      }

      function trackWidth(): void
      {
            // This function is use to ensure the collapsed side menu will be expanded when the browser's width > 768px.
            if (window.innerWidth >= 768)
            {
                  setDynamicWidth('160px');
                  setDynamicOpacity('1');
                  setShowSidebar(true);
            }
      }

      return (
            <>
                  <div className={ `${ styles.background }` }></div>
                  <div className="h-full w-full">
                        <button ref={ navToggler } className={ `${ styles.navToggler } fixed` } onClick={ handleToggleSidebar }><FontAwesomeIcon icon={ faBars } style={ { color: "#000000", fontSize: '1.5rem' } } /></button>
                        <div className={ `h-full flex flex-col fixed ${ styles.navbar }` } style={ { backgroundColor: '#E6E6E6', width: dynamicWidth } } ref={ navbar }>
                              <div className={ `w-full ${ styles.dummy }` } style={ { minHeight: '50px' } }></div>
                              <div className={ `grow flex flex-col overflow-auto ${ styles.tabs } mt-md-3 hideBrowserScrollbar` } style={ { opacity: dynamicOpacity } }>
                                    <NavLink to={ "/staff" } className={ `${ activeTab.includes('/staff') ? styles.activeTab : styles.hover } no-underline mb-3 flex items-center justify-center mt-12` } onClick={ () => setRender(!render) }>
                                          <p className={ `flex items-center justify-center p-0` } style={ { fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' } }><GrUserWorker />Staff</p>
                                    </NavLink>
                                    <NavLink to={ "/vehicle" } className={ `${ activeTab.includes('/vehicle') ? styles.activeTab : styles.hover } no-underline mb-3 flex items-center justify-center mt-12` } onClick={ () => setRender(!render) }>
                                          <p className={ `flex items-center justify-center p-0` } style={ { fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' } }><FaTruckMoving />Vehicles</p>
                                    </NavLink>
                                    <NavLink to={ "/route" } className={ `${ activeTab.includes('/route') ? styles.activeTab : styles.hover } no-underline mb-3 flex items-center justify-center mt-12` } onClick={ () => setRender(!render) }>
                                          <p className={ `flex items-center justify-center p-0` } style={ { fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' } }><GiRoad />Routes</p>
                                    </NavLink>
                                    <NavLink to={ "/area" } className={ `${ activeTab.includes('/area') ? styles.activeTab : styles.hover } no-underline mb-3 flex items-center justify-center mt-12` } onClick={ () => setRender(!render) }>
                                          <p className={ `flex items-center justify-center p-0` } style={ { fontSize: '2rem', whiteSpace: 'nowrap', color: 'black' } }><RiRoadMapLine />Areas</p>
                                    </NavLink>
                                    <div className={ `${ styles.hover } mt-auto flex justify-center` } onClick={ logOut } >
                                          <span className={ `flex items-center p-0` } style={ { fontSize: '2rem', whiteSpace: 'nowrap', color: 'red' } }><AiOutlinePoweroff className={ `mr-1` } />Log out</span>
                                    </div>
                              </div>
                        </div>

                        <div className={ `${ styles.page } flex ` }>
                              <div className='w-[95%] h-[95%] m-auto border-2 rounded-lg border-black' style={ {
                                    backgroundColor: '#E6E6E6'
                              } }>
                                    <Outlet />
                              </div>
                        </div>
                  </div>
            </>
      )
}