import styled, { css, createGlobalStyle } from 'styled-components'
import Helonik from './assets/helonik.otf'

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: helonik;
      src: url(${Helonik}) format('opentype');
    }
    
    html * {
        font-family: helonik;
    }
    
    body {
        background-color: #000000;
        opacity: 1;
        background-image: radial-gradient(#222222 2px, #000000 2px);
        background-size: 40px 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    input, button, textarea {
        border-color: transparent;
        border-radius: 6px;
        font-size: 20px;
        color: black;
        background: grey;
    }
    
    textarea {
        resize: vertical;
    }
    
    label {
        padding-bottom: 2px;
    }
`;

const BlurBox = styled.div`
    background-color: rgba(255, 255, 255, 0.01);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    border-radius: 20px;
    border-style: solid;
    border-color: grey;
    border-width: thin;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: space-between;
`;

const InputField = styled.div`
    width: 400px;
    font-size: 30px;
    padding: 10px;
    font-family: helonik;
    display: flex;
    flex-direction: column;
    justify-content: left;
    color: grey;
`;

const RememberMe = styled.div`
    font-size: 30px;
    font-family: helonik;
    display: flex;
    flex-direction: column;
    justify-content: left;
    color: grey;
`;

const Or = styled.div`
    width: 400px;
    font-size: 20px;
    padding: 10px;
    font-family: helonik;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: grey;
    gap: 10px;
`;

const Rectangle = styled.div`
    height: 2px;
    width: 100%;
    background: grey;
`;

function App() {
  return (
    <>
        <GlobalStyle />
        <BlurBox>
            <InputField>
                todo
            </InputField>
            <InputField>
                <label for="uname">username</label>
                <input type="text" placeholder="" name="uname" required />
            </InputField>
            <InputField>
                <label for="psw">password</label>
                <input type="password" placeholder="" name="psw" required />
            </InputField>
            <InputField>
                <RememberMe>
                    <label>
                      <input type="checkbox" checked="checked" name="remember" /> remember me
                    </label>
                </RememberMe>
            </InputField>
            <InputField>
                <button type="submit">login</button>
            </InputField>
            <Or>
                <Rectangle />
                <div>or</div>
                <Rectangle />
            </Or>
            <InputField>
                    <button type="submit" onclick="location.href='register.html'">register</button>
            </InputField>
        </BlurBox>
    </>
  )
}

export default App;
