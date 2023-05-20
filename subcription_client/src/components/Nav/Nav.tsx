import React from 'react'
import { Navbar, NavItem, NavLink } from 'react-bootstrap'
type Props = {}

const Nav = (props: Props) => {
  return (
    <Navbar>
        <NavItem>
            <NavLink>Home</NavLink>
        </NavItem>
    </Navbar>
  )
}

export default Nav