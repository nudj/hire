const React = require('react')
const { Helmet } = require('react-helmet')
const { Link } = require('react-router-dom')
const get = require('lodash/get')
const { Text, Align, Icon } = require('@nudj/components')
const { css, mss } = require('@nudj/components/styles')

const Layout = require('../../components/app-layout')
const ButtonLink = require('../../components/button-link')
const ActionBar = require('../../components/action-bar')
const Section = require('../../components/section')
const TitleCard = require('../../components/title-card')
const DraggableList = require('../../components/draggable-list')
const { Heading, Para } = require('../../components/app')
const { submitQuestionOrder } = require('./actions')
const style = require('./style.css')

function onDragEndHandler (dispatch) {
  return reorderedList => {
    dispatch(submitQuestionOrder(reorderedList))
  }
}

const SurveysQuestionsPage = props => {
  const { manageSurveyQuestionsPage: state, dispatch } = props
  const survey = get(props, 'user.hirer.company.survey')
  const baseUrl = `/manage/surveys/${survey.slug}/questions`
  const title = 'Surveys'
  const onDragEnd = onDragEndHandler(dispatch)

  return (
    <Layout {...props}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {survey.questions && survey.questions.length ? (
        <div>
          <TitleCard title={title}>
            <Text element='p' style={style.descriptionParagraph}>
              Your survey questions can be used to help your guide your team towards uncovering the best candidates in their networks.
            </Text>
            <Text element='p' style={style.descriptionParagraph}>
              You can drag and reorder the questions to change which ones come first.
            </Text>
          </TitleCard>
          <ActionBar style={{ root: mss.mtReg }}>
            {actionStyle => [
              <ButtonLink
                key='add-survey-button'
                style={actionStyle}
                context='primary'
                to={`/manage/surveys/${survey.slug}/questions/new`}
                subtle
              >
                Add new question
              </ButtonLink>
            ]}
          </ActionBar>
          <DraggableList
            onDragEnd={onDragEnd}
            reorderedList={state.reorderedList}
          >
            {survey.questions.map(question => (
              <div id={question.id} key={question.id} className={css(style.listItem)}>
                <Link className={css(style.card)} to={`${baseUrl}/${question.slug}`}>
                  <Align
                    leftChildren={(
                      <div className={css(style.titleContainer)}>
                        <Text element='div' size='largeI' style={style.title} nonsensitive>
                          {question.title}
                        </Text>
                      </div>
                    )}
                    rightChildren={(
                      <Icon style={style.chevron} name='chevron' />
                    )}
                  />
                </Link>
              </div>
            ))}
          </DraggableList>
        </div>
      ) : (
        <Section style={[mss.center, mss.mtReg]}>
          <Heading nonsensitive level={1} style={mss.fgPrimary}>
            Add a question
          </Heading>
          <Para nonsensitive>
            Your survey questions can be used to help your guide your team towards uncovering the best candidates in their networks.
          </Para>
          <ButtonLink
            nonsensitive
            href={`${baseUrl}/new`}
            style={mss.mtLgI}
            context='primary'
            subtle
          >
            Add new question
          </ButtonLink>
        </Section>
      )}
    </Layout>
  )
}

module.exports = SurveysQuestionsPage
