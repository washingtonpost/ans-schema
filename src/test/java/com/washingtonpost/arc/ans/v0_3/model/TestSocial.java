package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests the Social schema</p>
 */
public class TestSocial extends AbstractTest<Social> {

    @Override
    String getSchemaName() {
        return "social";
    }

    @Override
    Class getTargetClass() {
        return Social.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("social-fixture-good", true);
        Social social = testClassSerialization("social-fixture-good");
        assertThat(social.getSite(), is("twitter"));
        assertThat(social.getUrl(), is("https://www.twitter.com/Anthony_Faiola"));
    }
}
