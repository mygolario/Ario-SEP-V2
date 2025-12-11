'use client';

import { useEffect } from 'react';
import { driver } from 'driver.js';
import "driver.js/dist/driver.css";

export const TourGuide = () => {
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        
        if (!hasSeenTour) {
            const driverObj = driver({
                showProgress: true,
                allowClose: true,
                nextBtnText: 'بعدی',
                prevBtnText: 'قبلی',
                doneBtnText: 'پایان',
                steps: [
                    { 
                        element: '#sidebar-container', 
                        popover: { 
                            title: 'پنل مدیریت', 
                            description: 'اینجا مرکز فرماندهی شماست. به تمام ابزارها از اینجا دسترسی دارید.', 
                            side: "left", 
                            align: 'start' 
                        } 
                    },
                    { 
                        element: '#nav-item-plan', 
                        popover: { 
                            title: 'بوم کسب‌وکار', 
                            description: 'اولین قدم: بوم کسب‌وکار خود را ببینید و آن را ویرایش کنید.', 
                            side: "left", 
                            align: 'center' 
                        } 
                    },
                    { 
                        element: '#nav-item-settings', 
                        popover: { 
                            title: 'تنظیمات', 
                            description: 'اطلاعات خود را اینجا ویرایش کنید.', 
                            side: "left", 
                            align: 'center' 
                        } 
                    },
                ],
                onDestroyStarted: () => {
                    localStorage.setItem('hasSeenTour', 'true');
                    driverObj.destroy();
                }
            });

            // Small delay to ensure DOM is ready
            setTimeout(() => {
                driverObj.drive();
            }, 1000);
        }
    }, []);

    return null;
};
