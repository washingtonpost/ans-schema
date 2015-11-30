package com.washingtonpost.arc.ans.v0_3.model;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertEquals;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Story" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestStory extends AbstractANSTest<Story> {

    @Override
    String getSchemaName() {
        return "story";
    }

    @Override
    Class getTargetClass() {
        return Story.class;
    }

    @Test
    public void testStoryGood() throws Exception {
        testJsonValidation("story-fixture-good", true);
        Story story = testClassSerialization("story-fixture-good");
        assertThat(story.getId(), is("unique ANS id"));
        assertThat(story.getCreatedDate(), is("2015-06-24T09:50:50.52Z"));
        assertThat(story.getLastUpdatedDate(), is("2015-06-24T09:50:50.52Z"));
        assertThat(story.getCredits().size(), is(1));
        assertThat(story.getCredits().get(0).getName(), is("John Q. Reporter"));
        assertThat(story.getCredits().get(0).getRole(), is("Author"));
        assertThat(story.getCredits().get(0).getOrg(), is("The Washington Post"));
        assertThat(story.getCredits().get(0).getSocialLinks().get(0).getSite(), is("twitter"));
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
        assertThat(story.getHeadlines().size(), is(2));
        assertThat(story.getHeadlines().containsKey("twitter"), is(true));
        assertThat(story.getHeadlines().get("default"), is("The default headline for this story"));
        assertThat(story.getDescription(), is("A Vienna man went in for a colonoscopy and intended to record his doctor"));
        assertThat(story.getRelatedContent().size(), is(1));
        assertThat(story.getRelatedContent().get(0).getId(), is("some other unique ANS id"));
        assertThat(story.getPromoImages().size(), is(1));
        Image promoImage = story.getPromoImages().get(0);
        assertThat(promoImage.getId(), is("unique ANS id"));
        assertThat(promoImage.getCreatedDate(), is("2015-06-25T09:50:50.52Z"));
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
        assertThat(story.getPublishDate(), is("2015-06-24T09:49:00.10Z"));
        assertThat(story.getDisplayDate(), is("2015-06-25T09:50:50.52Z"));
        assertThat(story.getEditorNote(), startsWith("This URL earlier linked to a post"));
        assertThat(story.getStatus(), is("published"));
        assertThat(story.getContentElements().size(), is(7));
        assertThat(story.getContentElements().get(0), is(instanceOf(Text.class)));
        assertThat(story.getContentElements().get(1), is(instanceOf(Text.class)));
        assertThat(story.getContentElements().get(2), is(instanceOf(Image.class)));
        assertThat(story.getContentElements().get(6), is(instanceOf(Oembed.class)));
        assertThat(((ContentElement)story.getContentElements().get(6)).getChannels().contains("android"), is(true));
    }

    /**
     * Just another "happy path" test with real content instead of made-up content
     * @throws Exception
     */
    @Test
    public void testStoryTinyHouseGood() throws Exception {
        testJsonValidation("story-fixture-tiny-house", true);
        testClassSerialization("story-fixture-tiny-house");
    }

    /**
     * <p>After the 0.3.0 release, we noticed sometimes we'd get JSON blocks of Story objects that had 2 separate "type":"story"
     * elements in them.  We suspect that's due to there being an explicit Ans.type field with a JSON in addition to the
     * "JsonTypeInfo" annotation at the class-level.  This test stresses that theory, and then verifies the fix.</p>
     * <p>The fix, FWIW is explicitly setting the type of each object in its constructor and using the
     * "JsonTypeInfo.As.EXISTING_PROPERTY" value in the ANS.java's @JsonTypeInfo setup</p>
     * @throws java.lang.Exception
     */
    @Test
    public void testTypeIsNotSavedTwice() throws Exception {
        Story story = testClassSerialization("story-fixture-good");

        String json = objectMapper.writeValueAsString(story);

        Matcher matcher = Pattern.compile("\"type\":\"story\"").matcher(json);

        int count = 0;
        while (matcher.find()) {
            count++;
        }

        assertEquals("Expected exactly 1 \"type\":\"story\" field in our JSON, got " + count + " instead", 1, count);
    }
}
