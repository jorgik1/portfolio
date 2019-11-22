import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import {Container, Button} from 'components/common'
import dev from 'assets/illustrations/skills.svg'
import {Wrapper, SkillsWrapper, Details, Thumbnail} from './styles'
import {List} from "../../common/LIst";

export const Skills = () => (
	<Wrapper id="about">
		<SkillsWrapper as={Container}>
			<Thumbnail>
				<img src={dev} alt="I’m Yuriy and I’m a Backend engineer!" />
			</Thumbnail>
			<Details>
				<h1>Hi There!</h1>
				<p>Who I am:</p>

				<List>
					<li>5 years of web development experience using Drupal</li>
					<li>1-2 years of Drupal 8 CMS development experience</li>
					<li>I have experience with Linux/Open Source software</li>
					<li>I have knowledge of Javascript, JQuery, AJAX, MySQL</li>
					<li>I have knowledge of Servers and Configuration</li>
					<li>I have knowledge of integrating A/B testing platforms, Google analytics</li>
					<li>I have experience preparing UML technical system documentation</li>
					<li>I have a post-secondary diploma in radio-physic engineering</li>
					<li>Complete understanding of the project lifecycle</li>
					<li>Excellent knowledge in Drupal, creating custom modules and hooks</li>
					<li>Extreme attention to detail and consistency to minimize errors</li>
					<li>Excellent organizational and troubleshooting skills with attention to detail</li>
					<li>Professional, reliable, and possessing a strong work ethic</li>
					<li>Excellent verbal, written, inter-personal communication skills</li>
					<li>A positive attitude and eagerness to learn are essential</li>
				</List>
				<Button as={AnchorLink} href="#contact">
					Hire me
				</Button>
			</Details>
		</SkillsWrapper>
	</Wrapper>
)
