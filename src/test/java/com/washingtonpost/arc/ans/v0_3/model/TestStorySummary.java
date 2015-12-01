package com.washingtonpost.arc.ans.v0_3.model;

import java.io.IOException;
import java.net.URL;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import org.junit.Test;

/**
 * <p>Tests our StorySummary digest of the Story object</p>
 */
public class TestStorySummary extends AbstractTest<StorySummary> {

    @Test
    public void testSummaryConstruction() throws IOException {
        URL url = getSisterPathResource("story-fixture-good");
        Story story = objectMapper.readValue(url, Story.class);

        StorySummary summary = StorySummary.fromStory(story);

        assertEquals("unique ANS id", summary.getId());
        assertTrue(summary.getCanonicalUrl().startsWith("http://www.washingtonpost.com/local/anesthesiologist-"));
        assertEquals("2015-06-24T09:50:50.52Z", summary.getLastUpdatedDate());
        assertEquals("John Q. Reporter", summary.getCredits().get(0).getName());
        assertEquals("The default headline for this story", summary.getHeadlines().get(0).getHeadline());
    }

    @Override
    String getSchemaName() {
        return "story-summary";
    }

    @Override
    Class getTargetClass() {
        return StorySummary.class;
    }
}
