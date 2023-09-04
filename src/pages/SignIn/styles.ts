import styled from 'styled-components'

export const SignInContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url('https://img.freepik.com/free-vector/restaurant-symbols-seamless-pattern-doodle-sketch_1284-12804.jpg?w=1380&t=st=1685648460~exp=1685649060~hmac=ab562cafac6049ce479ef167a36b72bab20b86581a29dd3836596d8ca15a699c');
`

export const SignInGeneralContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  width: 40%;
  background-color: #2e1413;
  border-radius: 24px;
  align-items: center;
`

export const SignInContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const WelcomeText = styled.span`
  font-size: 52px;
  font-weight: 700;

  margin-top: 6.5rem;
  margin-bottom: 6.5rem;

  color: #fff;
`

export const SignInButton = styled.button`
  align-self: center;

  width: 15.6rem;
  height: 4rem;

  margin-top: 3.5rem;

  border-radius: 48px;
  border-width: 0;

  background-color: #fff;

  font-size: 18px;
  font-weight: bold;
  color: #000;
  :hover {
    background-color: #c5c5c5;
    transition: 0.3s;
  }
`

export const SignInFormContent = styled.form`
  display: flex;
  flex-direction: column;
  width: 70%;
`
