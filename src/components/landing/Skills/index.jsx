import React from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Container, Button } from 'components/common'
import dev from 'assets/illustrations/skills.svg'
import { Wrapper, SkillsWrapper, Details, Thumbnail } from './styles'

export const Skills = () => (
	<Wrapper id="about">
		<SkillsWrapper as={Container}>
			<Thumbnail>
				<img src={dev} alt="I’m Yuriy and I’m a Backend engineer!" />
			</Thumbnail>
			<Details>
				<h1>Hi There!</h1>
				<p>
                 Who I am:
                  3+ years of web development experience using Drupal
                  1-2 years of Drupal 8 CMS development experience
                  Experience with Linux/Open Source software
                  Knowledge of Javascript, JQuery, AJAX, MySQL required
                  Knowledge of Servers and Configuration
                  Knowledge of integrating A/B testing platforms, Google analytics is an asset
                  Experience preparing UML technical system documentation is an asset
                  Post-secondary diploma or degree in computer science, engineering, or a related field an asset
                  Complete understanding of the project lifecycle
                  Excellent knowledge in Drupal, creating custom modules and hooks
                  A willingness to work in a fast-paced environment outside of normal working hours where required
                  Extreme attention to detail and consistency to minimize errors
                  Excellent organizational and troubleshooting skills with attention to detail
                  Professional, reliable, and possessing a strong work ethic
                  Excellent verbal, written, inter-personal communication skills
                  A positive attitude and eagerness to learn are essential
				</p>
				<Button as={AnchorLink} href="#contact">
          Hire me
				</Button>
			</Details>
		</SkillsWrapper>
	</Wrapper>
)
