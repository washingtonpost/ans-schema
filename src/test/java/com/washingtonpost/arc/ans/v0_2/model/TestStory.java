package com.washingtonpost.arc.ans.v0_2.model;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Story" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestStory extends AbstractTest<Story> {
    
    @Override
    String getSchemaName() {
        return "story";
    }

    @Override
    Class getTargetClass() {
        return Story.class;
    }

    @Test
    @Override
    public void testEqualsAndHashCode() {
        EqualsVerifier.forClass(getTargetClass())
                .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                .withRedefinedSuperclass()
                .verify();
    }

    @Test
    public void testStoryGood() throws Exception {
        testJsonValidation("story-fixture-good", true);
        Story story = testClassSerialization("story-fixture-good");
        assertThat(story.getGuid(), is("unique ANS id"));
        assertThat(story.getCreatedDate(), is(date("2015-06-24T09:50:50.52Z")));
        assertThat(story.getLastUpdatedDate(), is(date("2015-06-24T09:50:50.52Z")));
        assertThat(story.getCredits().size(), is(1));
        assertThat(story.getCredits().get(0).getName(), is("Bob Woodward"));
        assertThat(story.getCredits().get(0).getRole(), is("Author"));
        assertThat(story.getCredits().get(0).getOrg(), is("The Washington Post"));
        assertThat(story.getLanguage(), is("en"));
        assertThat(story.getLocation(), is("Washington, D.C."));
        assertThat(story.getGeo().getLatitude(), is(38.9047));
        assertThat(story.getGeo().getLongitude(), is(-77.0164));
        assertThat(story.getAddress().getStreetAddress(), is("1600 Pennsylvania Ave"));
        assertThat(story.getAddress().getExtendedAddress(), is("West Wing"));
        assertThat(story.getAddress().getLocality(), is("Washington, D.C."));
        assertThat(story.getAddress().getPostalCode(), is("20002"));
        assertThat(story.getAddress().getCountryName(), is("USA"));
        assertThat(story.getCopyright(), is("(c) 2015 The Washington Post, Inc."));
        assertThat(story.getCanonicalUrl(), is("http://www.washingtonpost.com/local/anesthesiologist-trashes-sedated-"
                + "patient-jury-orders-her-to-pay-500000/2015/06/23/cae05c00-18f3-11e5-ab92-c75ae6ab94b5_story.html"));
        assertThat(story.getShortUrl(), is("http://wapo.st/1Crp6bY"));
        assertThat(story.getTitle(), is("He didn\u2019t hear the insults. His phone did."));
        assertThat(story.getHeadline(), is("The default headline for this story"));
        assertThat(story.getDescription(), is("A Vienna man went in for a colonoscopy and intended to record his doctor"));
        assertThat(story.getRelatedContent().size(), is(1));
        assertThat(story.getRelatedContent().get(0).getGuid(), is("some other unique ANS id"));
        assertThat(story.getPromoImages().size(), is(1));
        Image promoImage = story.getPromoImages().get(0);
        assertThat(promoImage.getGuid(), is("unique ANS id"));
        assertThat(promoImage.getCreatedDate(), is(date("2015-06-25T09:50:50.52Z")));
        assertThat(promoImage.getCredits().get(0).getName(), is("Ansel Adams"));
        assertThat(promoImage.getCredits().get(0).getRole(), is("Photographer"));
        assertThat(promoImage.getUrl(), is("https://tinyurl.com/mqyonhb"));
        assertThat(promoImage.getCaption(), is("Never gonna give you up"));
        assertThat(promoImage.getSubtitle(), is("Never gonna let you down"));
        assertThat(promoImage.getHeight(), is(640));
        assertThat(promoImage.getWidth(), is(800));
        assertThat(story.getTaxonomy().getKeywords().get(0).getKeyword(), is("Anesthesiologist"));
        assertThat(story.getTaxonomy().getKeywords().get(0).getFrequency(), is(2));
        assertThat(story.getTaxonomy().getKeywords().get(0).getScore(), is(0.77));
        assertThat(story.getPublishDate(), is(date("2015-06-24T09:49:00.10Z")));
        assertThat(story.getDisplayDate(), is(date("2015-06-25T09:50:50.52Z")));
        assertThat(story.getHtml(), startsWith("<article itemprop="));
        assertThat(story.getEditorNote(), startsWith("This URL earlier linked to a post"));
        assertThat(story.getStatus(), is("published"));
    }

    /**
     * Just another "happy path" test with real content instead of made-up content
     * @throws Exception
     */
    @Test
    public void testStoryTinyHouseGood() throws Exception {
        testJsonValidation("story-fixture-tiny-house", true);
    }
}

