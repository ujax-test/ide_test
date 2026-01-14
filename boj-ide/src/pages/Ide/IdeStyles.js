import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #2d2d2d;
  border-bottom: 1px solid #444;
`;

export const Title = styled.h3`
  margin: 0;
  margin-right: 20px;
  color: #fff;
  font-weight: 600;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #3c3c3c;
  color: white;
  outline: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #777;
  }
`;

export const DetectMessage = styled.span`
  margin-left: 15px;
  color: #4caf50;
  font-size: 14px;
  font-weight: bold;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const RunButton = styled.button`
  margin-left: auto;
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  background-color: #007acc;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #005f9e;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const EditorWrapper = styled.main`
  flex: 1;
  position: relative;
  
  & > section {
    height: 100%;
  }
`;