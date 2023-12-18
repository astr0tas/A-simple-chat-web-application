import styles from './Menu.module.css';
import { Outlet, NavLink, useNavigate, NavigateFunction } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../General css/scroll.css';
import domain from '../../config/serverDomain.config';
import request from '../../Tools/request.tool';
import { AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

export default function Menu(): JSX.Element
{
      const [render, setRender] = useState<boolean>(false);
      const [activeTab, setActiveTab] = useState<string | null>(null);

      const Navigate: NavigateFunction = useNavigate();

      useEffect(() =>
      {
            // request.get(`${ domain }/`)
            //       .then(res =>
            //       {
            //             if (!res.data.found)
            //                   Navigate('/');
            //             else
            //                   setActiveTab(window.location.pathname);
            //       })
            //       .catch(error => console.log(error));

      }, [render, Navigate]);

      function logOut(): void
      {
            // request.delete(`${ domain }/logout`)
            //       .then(res =>
            //       {
            //             Navigate('/');
            //       })
            //       .catch(error => console.log(error));
      }

      return (
            <div className="h-full w-full flex flex-col">
                  <div className="flex bg-white items-center justify-center h-[60px] order-first max-[768px]:order-last">
                        <NavLink to={ "/message" } className={ `${ activeTab && activeTab.includes('/message') ? styles.activeTab : styles.hover } h-full w-[100px] flex items-center justify-center text-5xl no-underline mx-auto max-[400px]:text-3xl max-[400px]:w-[75px]` } onClick={ () => setRender(!render) }>
                              <AiFillMessage />
                        </NavLink>
                        <NavLink to={ "/friend" } className={ `${ activeTab && activeTab.includes('/friend') ? styles.activeTab : styles.hover } h-full w-[100px] flex items-center justify-center text-5xl no-underline mx-auto max-[400px]:text-3xl max-[400px]:w-[75px]` } onClick={ () => setRender(!render) }>
                              <FaUserFriends />
                        </NavLink>
                        <NavLink to={ "/notification" } className={ `${ activeTab && activeTab.includes('/notification') ? styles.activeTab : styles.hover } h-full w-[100px] flex items-center justify-center text-5xl no-underline mx-auto max-[400px]:text-3xl max-[400px]:w-[75px]` } onClick={ () => setRender(!render) }>
                              <IoIosNotifications />
                        </NavLink>
                        <NavLink to={ "/setting" } className={ `${ activeTab && activeTab.includes('/setting') ? styles.activeTab : styles.hover } h-full w-[100px] flex items-center justify-center text-5xl no-underline mx-auto max-[400px]:text-3xl max-[400px]:w-[75px]` } onClick={ () => setRender(!render) }>
                              <IoSettings />
                        </NavLink>
                  </div>
                  <div className="w-full grow order-last max-[768px]:order-first">
                        <Outlet />
                  </div>
            </div>
      )
}