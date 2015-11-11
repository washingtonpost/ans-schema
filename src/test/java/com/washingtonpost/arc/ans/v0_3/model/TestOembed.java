package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;
import java.util.Map;

/**
 * <p>Tests that JSON we expect to be a valid "Paragraph" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestOembed extends AbstractANSTest<Oembed> {

    @Override
    String getSchemaName() {
        return "oembed";
    }

    @Override
    Class getTargetClass() {
        return Oembed.class;
    }

    @Test
    public void testGood() throws Exception {
        testJsonValidation("oembed-fixture-good", true);
        Oembed embed = testClassSerialization("oembed-fixture-good");
        assertThat(embed.getId(), is("0987654321"));
        assertThat(embed.getType(), is("oembed"));
        assertThat(embed.getProviderUrl(), is("https://api.twitter.com/1/statuses/oembed.json"));
        assertThat(embed.getObjectUrl(), is("https://twitter.com/BradDavis_WFTS/status/664422935130566656"));
    }

    @Test
    public void testBad() throws Exception {
        testJsonValidation("oembed-fixture-bad", false);
    }

}
