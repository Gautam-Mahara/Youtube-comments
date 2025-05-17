// i am using Foot.css for styling the footer component.
import '../smallComponents/foot.css'
import React from 'react'

import { Link } from 'react-router-dom'

export default function Socials() {
    // const [isOpen, setIsOpen] = React.useState(false);
    return <>
        <div className='socials'>
            <ul>
                <a href="" target='_blank' ><li>LinkedIn</li></a>
                <a href="" target='_blank'> <li>Project Website</li></a>
                <a href="" target='_blank'><li>Instagram</li></a>
                <a href="" target='_blank'><li>Contact Me</li></a>


                <li>Contact Me</li>
            </ul>
        </div>

    </>
}