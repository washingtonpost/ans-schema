      // Convert revision
      var convertRevision = function convertRevision(ans) {

        if (!_.isObject(ans)) {
          return ans;
        }
        else if (_.isArray(ans)) {
          return _.map(ans, convertRevision);
        }
        else if (_.isObject(ans)) {
          if (_.has(ans, "type") && ans.type === 'story'
              && _.has(ans, "revision")) {
            var revision = _.transform(ans.revison, function(result, value, key, object) {
              if (_.indexOf(["revision_id", "parent_id", "branchName", "editions"], key) > -1) {
                result[key] = value;
              }
              else if (key === 'branch' && !_.has(object, "branchName")) {
                result["branchName"] = value;
              }
              else {
                result['additional_properties'][key] = value;
              }
            }, { "additional_properties": {} });

            ans = convertRevision(ans);

            ans.revision = revision;
            return ans;
          }
          else {
            return _.transform(ans, function(result, value, key, object) {
              if (key === "additional_properties") {
                result[key] = value;
              }
              else {
                result[key] = convertRevision(value);
              }
            }, {});
          }
        }
      };

      return convertRevision(output);
