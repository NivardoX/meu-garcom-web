import styled from 'styled-components'

export const SignInContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  justify-content: center;
  align-items: center;
  background-image: url('https://img.freepik.com/free-vector/vector-seamless-food-chalkboard-wallpapers-mostly-used-restaurants-designs_1284-43589.jpg?w=826&t=st=1685645708~exp=1685646308~hmac=163b13b819e9bef4a753c0733dca7573ce11045ae058bee12005caa2ff68ab26');
`

export const SignInContent = styled.div`
  display: flex;
  align-items: center;
  height: 70%;
  width: 40%;
  border-radius: 35px;
  align-items: center;
  flex-direction: column;

  background-color: #242021;
`

export const SignInImageContent = styled.div``

export const WelcomeText = styled.span`
  font-size: 52px;
  font-weight: 700;
  color: #fff;
`

export const SignInButton = styled.button`
  width: 15.6rem;
  height: 4rem;

  margin-top: 3.5rem;

  border-radius: 50px;
  border-width: 0;

  background-color: #fff;

  font-size: 18px;
  font-weight: bold;
  color: #000;
  transition: 0.2s;
  :hover {
    background-color: #ccc;
  }
`

export const SignInFormContent = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`
