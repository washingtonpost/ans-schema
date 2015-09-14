package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Headline" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestHeadline extends AbstractTest<Headline> {
    
    @Override
    String getSchemaName() {
        return "headline";
    }

    @Override
    Class getTargetClass() {
        return Headline.class;
    }

    @Test
    public void testHeadlineGood() throws Exception {
        testJsonValidation("headline-fixture-good", true);
        Headline headline = testClassSerialization("headline-fixture-good");
        assertThat(headline.getHeadline(), is("Here's a great headline"));
        assertThat(headline.getPurpose(), is("default"));
    }

    @Test
    public void testHeadlineBad() throws Exception {
        testJsonValidation("headline-fixture-bad", false);
    }
}
