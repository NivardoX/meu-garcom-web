import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const SideBarContainer = styled.div`
  display: flex;
  width: 16rem;
  height: 100vh;

  align-items: center;
  flex-direction: column;
  background-color: #181b23;

  border-right: 2px solid #353646;
`

export const SideBarLogoImage = styled.img`
  margin-top: 2.625rem;
  width: 6.5rem;
  height: 3.688rem;
  margin-bottom: 3.7rem;
`

export const SideBarOptionContent = styled(Link)`
  display: flex;
  width: 15rem;
  height: 3.1rem;

  margin-left: 50px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  margin-bottom: 23px;
  text-decoration: none;
  &:hover {
    span {
      text-decoration: underline;
    }
  }
`

export const SideBarName = styled.span`
  margin-left: 12px;
  color: #d1d2dc;
  font-size: 14px;
  font-family: 'Roboto';
  font-weight: 500;
`
export const ExitButton = styled.button`
  display: flex;
  width: 15rem;
  height: 3.1rem;

  margin-left: 50px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;

  margin-bottom: 23px;
  text-decoration: none;
  &:hover {
    span {
      text-decoration: underline;
    }
  }
`