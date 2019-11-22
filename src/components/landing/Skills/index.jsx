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
					<li>5 years of web development experience using Drupal and PHP</li>
					<li>Experience with Linux/Open Source software</li>
					<li>Knowledge of Javascript, AJAX, MySQL, React</li>
					<li>Knowledge of Servers and Configuration</li>
					<li>Knowledge of integrating A/B testing platforms, Google analytics</li>
					<li>Experience preparing UML technical system documentation</li>
					<li>I have a post-secondary diploma in radio-physic engineering</li>
					<li>Complete understanding of the project lifecycle</li>
					<li>Excellent knowledge in Drupal, creating custom modules and hooks</li>
					<li>Extreme attention to detail and consistency to minimize errors</li>
					<li>Excellent organizational and troubleshooting skills with attention to detail</li>
					<li>Excellent verbal, written, inter-personal communication skills</li>
				</List>
				<Button as={AnchorLink} href="#contact">
					Hire me
				</Button>
			</Details>
		</SkillsWrapper>
	</Wrapper>
)
