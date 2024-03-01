import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f7f7f7;
  padding: 50px 20px;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;

const IntroText = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
  transition: transform 0.5s ease, opacity 0.5s ease;
  &:hover{
    transform: scale(1.1);
  }
`;

const SubHeading = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #666;
  transition: transform 0.8s ease, opacity 0.5s ease;
`;

const Section = styled.section`
  &:hover {
    // background-color: #e0e0e0;
    // transform: scale(1.1);
    transition: transform 0.8s ease, opacity 0.5s ease;
    /* Add other hover effects as needed */
  }
`;

const Card = styled.div`
  background-color: #13898f5e;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 40px;
  margin: 20px;
  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.1);
    transition: transform 0.5s ease, opacity 0.5s ease;
    /* Add other hover effects as needed */
  }
`;

const CardSection = styled(Section)`
  display: flex;
//   justify-content: space-between;
  flex-direction: column; /* Stack cards vertically on smaller screens */
  @media screen and (min-width: 768px) {
    flex-direction: row; /* Reset to horizontal layout on larger screens */
  }
`;

const AboutUsSection = () => {
  return (
    <Container>
      <Content id='AboutUs'>
        <Heading>About Us</Heading>
        <IntroText>
          Welcome to <strong>Tech Solution</strong>, where innovation meets expertise in shaping the future of technology.
          At <strong>Tech Solution</strong>, we believe in the transformative power of technology to simplify complexities and drive growth.
          Our passion for innovation, combined with a deep understanding of industry trends, enables us to deliver cutting-edge solutions that redefine possibilities.
        </IntroText>

        <CardSection>
          <Card>
            <SubHeading>Our Mission</SubHeading>
            <Text>
              Our mission is clear: to empower businesses with intelligent, efficient, and scalable technology solutions.
              We strive to be at the forefront of technological advancements, providing our clients with the tools they need to thrive in an ever-evolving digital landscape.
            </Text>
          </Card>

          <Card>
            <SubHeading>Who We Are</SubHeading>
            <Text>
              <strong>Tech Solution</strong> is a team of dedicated professionals, each bringing a unique set of skills and experiences to the table.
              We are united by a common goal: to create exceptional solutions that exceed expectations and leave a lasting impact.
              Our diverse team thrives on challenges and is committed to turning your tech dreams into reality.
            </Text>
          </Card>
        </CardSection>

        {/* Add more sections as needed */}
      </Content>
    </Container>
  );
};

export default AboutUsSection;
