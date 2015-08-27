package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Media" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestMedia extends AbstractANSTest<Media> {
    
    @Override
    String getSchemaName() {
        return "media";
    }

    @Override
    Class getTargetClass() {
        return Media.class;
    }

    @Test
    public void testMediaGood() throws Exception {
        testJsonValidation("media-fixture-good", true);
        Media media = testClassSerialization("media-fixture-good");
        assertThat(media.getTitle(), is("Tiffany M. Ingham (Maj. Dale Greer/Kentucky Air National Guard)"));
        assertThat(media.getId(), is("unique ANS id"));
        assertThat(media.getCreatedDate(), is(date("2015-06-25T09:50:50.52Z")));
        assertThat(media.getCredits().size(), is(1));
        assertThat(media.getCredits().get(0).getName(), is("Ansel Adams"));
        assertThat(media.getCredits().get(0).getRole(), is("Photographer"));
    }
}
